#!/usr/bin/env node

import { binary, run, subcommands } from 'cmd-ts'
import install from './commands/install'
import generateIcons from './commands/generate-icons'

const app = subcommands({
  name: 'nativ',
  description: 'CLI for nativ library',
  version: '0.1.0',
  cmds: {
    install,
    'generate-icons': generateIcons,
  },
})

run(binary(app), process.argv)
