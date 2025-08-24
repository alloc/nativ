import { command, flag } from 'cmd-ts'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import spawn, { spawnSync as $ } from 'picospawn'
import { pick } from 'radashi'

export default command({
  name: 'install',
  description: 'Install nativ peer dependencies using pnpm',
  args: {
    noLockfile: flag({
      long: 'no-lockfile',
      description: 'Do not read or write the lockfile (forwarded to pnpm)',
    }),
  },
  handler: async ({ noLockfile }) => {
    // Read nativ's package.json to get peer dependencies
    const packageJsonPath = join(__dirname, '../../package.json')
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
    const peerDeps: Record<string, string> = packageJson.peerDependencies || {}

    // Use our fork, but still use @shopify/restyle as the package name.
    peerDeps['@shopify/restyle'] =
      'npm:@alloc/restyle@' + peerDeps['@shopify/restyle']

    // Use our fork, but still use moti as the package name.
    peerDeps['moti'] = 'npm:@alloc/moti@' + peerDeps['moti']

    // These dependencies must be installed with pnpm, not expo.
    const pnpmDeps = pick(peerDeps, (_, name) =>
      peerDeps[name].startsWith('npm:')
    )

    // These dependencies are installed with expo install, which ensures
    // only compatible versions are installed.
    const otherDeps = pick(peerDeps, (_, name) => !pnpmDeps[name])

    // These dependencies use a prerelease, so we need to install an exact version.
    for (const name of Object.keys(otherDeps)) {
      if (name === 'expo' || peerDeps[name].includes('-')) {
        const versions = await resolveNpmVersion(name, peerDeps[name])
        pnpmDeps[name] = versions.pop()!
        delete otherDeps[name]
      }
    }

    // Expo prefers ~ to be present, instead of an exact version.
    pnpmDeps.expo = '~' + pnpmDeps.expo

    $('pnpm install --save-exact', [
      ...Object.entries(pnpmDeps).map(
        ([name, version]) => `${name}@${version}`
      ),
      noLockfile && '--no-lockfile',
    ])
    $('expo install --pnpm', [
      ...Object.entries(otherDeps).map(
        ([name, version]) => `${name}@${version}`
      ),
      noLockfile && ['--', '--no-lockfile'],
    ])

    console.log('\n✔︎ Peer dependencies installed.')
  },
})

async function resolveNpmVersion(name: string, version: string) {
  type VersionResponse =
    | string[]
    | {
        error: { code: string; summary: string; detail: string }
      }

  const { stdout: response } = await spawn.json<VersionResponse>(
    `npm view ${name}@${version} version --json`
  )

  if (Array.isArray(response)) {
    return response
  }
  const { code, summary, detail } = response.error
  console.error('⚠️  %s %s: %s', code, summary, detail)
  process.exit(1)
}
