import { command, flag, optional, positional, string } from 'cmd-ts'
import { existsSync, rmSync, writeFileSync } from 'fs'
import { spawnSync as $ } from 'picospawn'

export default command({
  name: 'upgrade-template',
  description: 'Upgrade the nativ template',
  args: {
    commit: positional({
      description: 'The commit to upgrade to (default: main)',
      type: optional(string),
    }),
    shouldContinue: flag({
      long: 'continue',
      description:
        'Continue with the upgrade after merge conflicts are resolved',
    }),
  },
  handler: ({ commit = 'main', shouldContinue }) => {
    const patchFile = '.git/template-upgrade.patch'

    if (!shouldContinue) {
      console.log('• Fetching template...')

      // Ensure the template remote is added.
      if (!existsSync('.git/refs/remotes/template')) {
        $('git remote add template https://github.com/alloc/nativ-template.git')
      }

      // Fetch and merge the desired template commit.
      $('git fetch template', [commit])

      console.log()
    }

    // Get commit hash from ref.
    commit = $('git ls-remote template', [commit], {
      stdio: 'pipe',
    }).slice(0, 8)

    console.log('• Upgrading to %s...', commit)

    if (shouldContinue) {
      // Exit if template branch is missing.
      if (!existsSync(patchFile)) {
        console.error('⚠️  It seems no upgrade is in progress')
        process.exit(1)
      }

      $('git am --continue')
    } else {
      // Exit if the repo is not clean.
      if ($('git status --porcelain -uno', { stdio: 'pipe' })) {
        console.error('⚠️  Git repo must be clean')
        process.exit(1)
      }

      console.log('• Searching for current template commit...')

      // Find latest tag that starts with "nativ-template@".
      const tag = $(
        'git tag --sort=-creatordate | grep "^nativ-template@" | head -n 1',
        { stdio: 'pipe', shell: true }
      )

      if (!tag) {
        console.error('⚠️  No nativ-template tag found')
        process.exit(1)
      }

      const fromCommit = tag.split('@')[1]

      console.log('• Creating patch from %s to %s...', fromCommit, commit)

      // Create a temporary branch to squash the commits and remove the setup script.
      $('git checkout -b template-upgrade', [commit])
      $('git reset --soft', [fromCommit])
      $('git checkout HEAD -- setup.mts')
      $('git commit -m', [`chore: nativ-template@${commit} upgrade`])

      // Create a patch from the commit range.
      writeFileSync(
        patchFile,
        $('git format-patch -1 HEAD --stdout', {
          stdio: 'pipe',
        })
      )

      // Checkout the original branch.
      $('git checkout -')

      console.log('• Applying patch...')

      // Try to apply the patch.
      try {
        $('git am -3', [patchFile])
      } catch {
        console.error(
          '⚠️  Merge conflicts found. Resolve them and run `nativ upgrade-template --continue` to continue.'
        )
        process.exit(1)
      }
    }

    console.log('• Updating dependencies...')

    // Ensure dependencies are up to date.
    $('pnpm nativ install')

    console.log()

    // Commit and tag the upgrade.
    $('git add -u .')
    $('git commit --amend --no-edit --no-verify')
    $('git tag', [`nativ-template@${commit}`])

    // Clean up.
    $('git branch -D template-upgrade', { stdio: 'ignore' })
    rmSync(patchFile)

    console.log('\n✔︎ Template successfully upgraded!')
  },
})
