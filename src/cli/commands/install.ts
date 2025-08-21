import { command } from 'cmd-ts'
import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

export default command({
  name: 'install',
  description: 'Install nativ peer dependencies using pnpm',
  args: {},
  handler: () => {
    // Get current file directory in ES modules
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)

    // Read nativ's package.json to get peer dependencies
    const packageJsonPath = join(__dirname, '../../../package.json')
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))

    const peerDeps = packageJson.peerDependencies || {}

    // Install expo first
    console.log('Installing expo...')
    console.log(`\npnpm add expo@"${peerDeps.expo}"`)
    execSync(`pnpm add expo@"${peerDeps.expo}"`, { stdio: 'inherit' })

    // Get remaining dependencies (excluding expo)
    const remainingDeps = Object.entries(peerDeps)
      .filter(([name]) => name !== 'expo')
      .map(([name, version]) => `${name}@"${version}"`)
      .join(' ')

    console.log('Installing peer dependencies with expo...')
    console.log(`\nexpo install --pnpm ${remainingDeps}`)
    execSync(`expo install --pnpm ${remainingDeps}`, { stdio: 'inherit' })

    console.log('✅ Peer dependencies installed successfully!')
  },
})
