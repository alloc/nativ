import { command } from 'cmd-ts'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { spawnSync as $ } from 'picospawn'
import { pick } from 'radashi'

export default command({
  name: 'install',
  description: 'Install nativ peer dependencies using pnpm',
  args: {},
  handler: () => {
    // Read nativ's package.json to get peer dependencies
    const packageJsonPath = join(__dirname, '../../package.json')
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
    const peerDeps = packageJson.peerDependencies || {}

    // Use our fork of Restyle.
    peerDeps['@shopify/restyle'] =
      'npm:@alloc/restyle@' + peerDeps['@shopify/restyle']

    // Install expo first, so we can run expo install. Also include
    // any dependencies using the "npm:" protocol (not supported by
    // expo install).
    const initialDeps = pick(peerDeps, ['expo', '@shopify/restyle'])

    $(
      'pnpm add',
      Object.entries(initialDeps).map(([key, value]) => `${key}@${value}`)
    )

    for (const key in initialDeps) {
      delete peerDeps[key]
    }

    // Get remaining dependencies
    const otherDeps = Object.entries(peerDeps).map(([key, value]) =>
      value === '*' ? key : `${key}@${value}`
    )

    $('expo install --pnpm', otherDeps)

    console.log('\n✔︎ Peer dependencies installed.')
  },
})
