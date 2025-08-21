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
    peerDeps['drizzle-orm'] = 'beta'
    peerDeps['@shopify/restyle'] =
      'npm:@alloc/restyle@' + peerDeps['@shopify/restyle']

    // Install expo first
    console.log(`\npnpm add expo@"${peerDeps.expo}"`)
    $(`pnpm add expo@"${peerDeps.expo}"`)

    delete peerDeps.expo

    // Get remaining dependencies
    const otherDeps = Object.entries(peerDeps)
      .map(([key, value]) => (value === '*' ? key : `${key}@"${value}"`))
      .join(' ')

    $(`expo install --pnpm ${otherDeps}`)

    console.log('\n✅ Peer dependencies installed successfully!')
  },
})
