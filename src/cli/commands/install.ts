import { command, flag, option, optional, string } from 'cmd-ts'
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
    expoVersion: option({
      long: 'expo-version',
      description: 'The version of expo to install',
      type: optional(string),
    }),
  },
  handler: async ({ noLockfile, expoVersion }) => {
    // Read nativ's package.json to get peer dependencies
    const packageJsonPath = join(__dirname, '../../package.json')
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
    const peerDeps: Record<string, string> = packageJson.peerDependencies
    const peerDepsMeta: Record<string, { optional?: boolean }> =
      packageJson.peerDependenciesMeta

    // Read the project's package.json
    const projectPkgJsonPath = join(process.cwd(), 'package.json')
    const projectPkgJson = JSON.parse(readFileSync(projectPkgJsonPath, 'utf-8'))

    // The "nativ.exclude" field can be used to exclude dependencies from
    // being installed.
    const excludedDeps = projectPkgJson.nativ?.exclude || []

    for (const name of excludedDeps) {
      if (peerDepsMeta[name]?.optional) {
        delete peerDeps[name]
      } else {
        console.warn(
          `⚠️  The "${name}" package is not optional and therefore cannot be excluded from the project. Remove it from the "nativ.exclude" field in your project's package.json.`
        )
      }
    }

    // Use our fork, but still use @shopify/restyle as the package name.
    peerDeps['@shopify/restyle'] &&=
      'npm:@alloc/restyle@' + peerDeps['@shopify/restyle']

    // Use our fork, but still use moti as the package name.
    peerDeps['moti'] &&= 'npm:@alloc/moti@' + peerDeps['moti']

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
        let version: string
        if (name === 'expo' && expoVersion) {
          version = expoVersion
        } else {
          const versions = await resolveNpmVersion(name, peerDeps[name])
          version = versions[versions.length - 1]

          // Expo prefers ~ to be present, instead of an exact version.
          if (name === 'expo') {
            version = '~' + version
          }
        }
        pnpmDeps[name] = version
        delete otherDeps[name]
      }
    }

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
    | string
    | string[]
    | {
        error: { code: string; summary: string; detail: string }
      }

  const { stdout: response } = await spawn.json<VersionResponse>(
    `npm view ${name}@${version} version --json`
  )

  if (typeof response === 'string') {
    return [response]
  }
  if (Array.isArray(response)) {
    return response
  }
  const { code, summary, detail } = response.error
  console.error('⚠️  %s %s: %s', code, summary, detail)
  process.exit(1)
}
