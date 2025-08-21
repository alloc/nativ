#!/usr/bin/env node

import { binary, run, subcommands } from 'cmd-ts'
import pkg from '../../package.json'
import generateIcons from './commands/generate-icons'
import install from './commands/install'

const app = subcommands({
  name: 'nativ',
  description: 'CLI for nativ library',
  version: pkg.version,
  cmds: {
    install,
    'generate-icons': generateIcons,
  },
})

run(binary(app), process.argv)
