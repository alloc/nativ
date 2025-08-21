import { command } from 'cmd-ts'
import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

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
    execSync(`pnpm add expo@"${peerDeps.expo}"`, { stdio: 'inherit' })
    delete peerDeps.expo

    // Get remaining dependencies
    const otherDeps = Object.entries(peerDeps)
      .map(([key, value]) => (value === '*' ? key : `${key}@"${value}"`))
      .join(' ')

    execSync(`expo install --pnpm ${otherDeps}`, { stdio: 'inherit' })

    console.log('✅ Peer dependencies installed successfully!')
  },
})
