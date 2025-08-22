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
    const peerDeps = packageJson.peerDependencies || {}

    // Use our fork, but still use @shopify/restyle as the package name.
    peerDeps['@shopify/restyle'] =
      'npm:@alloc/restyle@' + peerDeps['@shopify/restyle']

    // Install an exact version of Expo.
    $(`pnpm install -E expo@${peerDeps.expo}`)

    // These dependencies must be installed with pnpm, not expo.
    const pnpmDeps = ['@shopify/restyle']

    // These dependencies are installed with expo install, which ensures
    // only compatible versions are installed.
    const otherDeps = Object.entries(peerDeps).filter(
      ([name]) => name !== 'expo' && !pnpmDeps.includes(name)
    )

    $(
      'pnpm install',
      pnpmDeps.map(name => `${name}@${peerDeps[name]}`)
    )
    $(
      'expo install --pnpm',
      otherDeps.map(([key, value]) => `${key}@${value}`)
    )

    console.log('\n✔︎ Peer dependencies installed.')
  },
})
