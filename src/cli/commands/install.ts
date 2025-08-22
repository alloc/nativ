import { command } from 'cmd-ts'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { spawnSync as $ } from 'picospawn'

export default command({
  name: 'install',
  description: 'Install nativ peer dependencies using pnpm',
  args: {},
  handler: () => {
    // Read nativ's package.json to get peer dependencies
    const packageJsonPath = join(__dirname, '../../package.json')
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
    const peerDeps: Record<string, string> = packageJson.peerDependencies || {}

    // Use our fork, but still use @shopify/restyle as the package name.
    peerDeps['@shopify/restyle'] =
      'npm:@alloc/restyle@' + peerDeps['@shopify/restyle']

    // These dependencies must be installed with pnpm, not expo.
    const pnpmDeps = Object.keys(peerDeps).filter(name =>
      peerDeps[name].startsWith('npm:')
    )

    // These dependencies use a prerelease, so we need to install an exact version.
    const exactDeps = Object.keys(peerDeps).filter(
      name =>
        !pnpmDeps.includes(name) &&
        (name === 'expo' || peerDeps[name].includes('-'))
    )

    // These dependencies are installed with expo install, which ensures
    // only compatible versions are installed.
    const otherDeps = Object.keys(peerDeps).filter(
      name => !pnpmDeps.includes(name) && !exactDeps.includes(name)
    )

    $(
      `pnpm install -E ${exactDeps.map(([name, version]) => `${name}@${version}`).join(' ')}`
    )
    $(
      'pnpm install',
      pnpmDeps.map(name => `${name}@${peerDeps[name]}`)
    )
    $(
      'expo install --pnpm',
      otherDeps.map(name => `${name}@${peerDeps[name]}`)
    )

    console.log('\n✔︎ Peer dependencies installed.')
  },
})
