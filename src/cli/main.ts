#!/usr/bin/env node

import { binary, run, subcommands } from 'cmd-ts'
import pkg from '../../package.json'
import generateIcons from './commands/generate-icons'
import install from './commands/install'
import upgradeTemplate from './commands/upgrade-template'

const app = subcommands({
  name: 'nativ',
  description: 'CLI for nativ library',
  version: pkg.version,
  cmds: {
    install,
    'generate-icons': generateIcons,
    'upgrade-template': upgradeTemplate,
  },
})

run(binary(app), process.argv)
