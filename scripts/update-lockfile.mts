import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { spawnSync as $ } from 'picospawn'
import { fileURLToPath } from 'url'

const gitStatus = $('git status --porcelain', { stdio: 'pipe' })
if (gitStatus) {
  console.error('⚠️ Git repo must be clean')
  process.exit(1)
}

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const packageJsonPath = join(__dirname, '..', 'package.json')
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'))
const expoPeerDep = packageJson.peerDependencies?.expo

if (expoPeerDep && expoPeerDep.includes('alpha')) {
  console.log('• Found "alpha" in Expo version, updating Expo dependencies...')

  // Find all expo-prefixed dependencies in peerDependencies
  const expoDeps = Object.keys(packageJson.peerDependencies).filter(
    dep => dep.startsWith('expo-') || dep.startsWith('@expo/')
  )

  console.log(
    `• Found ${expoDeps.length} expo dependencies to update:`,
    expoDeps
  )

  // Update each expo dependency to @next version
  for (const dep of expoDeps) {
    const nextVersion = $(`npm --silent view ${dep}@next version`, {
      stdio: 'pipe',
    })
    if (nextVersion) {
      console.log(`Updating ${dep} to ${nextVersion}`)
      packageJson.peerDependencies[dep] = nextVersion
    } else {
      console.warn(
        `⚠️ Could not get "next" version for ${dep}, using latest...`
      )
    }
  }

  // Save the updated package.json
  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n')
  console.log('• Updated package.json with new versions')
}

console.log('• Installing dependencies...')
$('pnpm install')
console.log()

// Check if lockfile changed
const lockfileStatus = $('git status --porcelain pnpm-lock.yaml', {
  stdio: 'pipe',
})
if (lockfileStatus) {
  $('git add pnpm-lock.yaml')
  $('git commit -m %s --author %s', [
    'chore(pnpm): update lockfile',
    'pnpm <https://pnpm.io>',
  ])
  console.log()
  console.log('• Lockfile committed successfully')
} else {
  console.log('• No changes to lockfile, nothing to commit')
}

if (expoPeerDep && expoPeerDep.includes('alpha')) {
  $('git checkout HEAD -- package.json')
}

console.log('✔︎ Success!')
