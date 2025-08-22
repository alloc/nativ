import { command } from 'cmd-ts'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import spawn, { spawnSync as $ } from 'picospawn'
import { pick } from 'radashi'

export default command({
  name: 'install',
  description: 'Install nativ peer dependencies using pnpm',
  args: {},
  handler: async () => {
    // Read nativ's package.json to get peer dependencies
    const packageJsonPath = join(__dirname, '../../package.json')
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
    const peerDeps: Record<string, string> = packageJson.peerDependencies || {}

    // Use our fork, but still use @shopify/restyle as the package name.
    peerDeps['@shopify/restyle'] =
      'npm:@alloc/restyle@' + peerDeps['@shopify/restyle']

    // These dependencies must be installed with pnpm, not expo.
    const pnpmDeps = pick(peerDeps, name => peerDeps[name].startsWith('npm:'))

    // These dependencies are installed with expo install, which ensures
    // only compatible versions are installed.
    const otherDeps = pick(peerDeps, name => !pnpmDeps[name])

    // These dependencies use a prerelease, so we need to install an exact version.
    for (const name of Object.keys(otherDeps)) {
      if (name === 'expo' || peerDeps[name].includes('-')) {
        const versions = await resolveNpmVersion(name, peerDeps[name])
        pnpmDeps[name] = versions.pop()!
        delete otherDeps[name]
      }
    }

    $(
      'pnpm install',
      Object.entries(pnpmDeps).map(([name, version]) => `${name}@${version}`)
    )
    $(
      'expo install --pnpm',
      Object.entries(otherDeps).map(([name, version]) => `${name}@${version}`)
    )

    console.log('\n✔︎ Peer dependencies installed.')
  },
})

async function resolveNpmVersion(name: string, version: string) {
  type VersionResponse =
    | string[]
    | {
        error: { code: string; summary: string; detail: string }
      }

  const { stdout: response } = await spawn<VersionResponse>(
    `npm view --silent ${name}@${version} version --json`,
    { stdio: 'pipe', json: true }
  )

  if (Array.isArray(response)) {
    return response
  }
  const { code, summary, detail } = response.error
  console.error('⚠️  %s %s: %s', code, summary, detail)
  process.exit(1)
}
