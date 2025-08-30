import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'tsup'

const components = fs.readdirSync(path.join(__dirname, 'src/ui'))

export default defineConfig([
  {
    entry: {
      ...components.reduce((acc, component) => {
        const type = path.extname(component)
        const name = `ui/${path.basename(component, type)}`
        acc[name] = `src/ui/${component}`
        return acc
      }, {}),
      providers: 'src/providers/index.ts',
      hooks: 'src/hooks/index.ts',
      polyfills: 'src/polyfills/index.ts',
    },
    format: ['cjs'],
    dts: { only: true },
  },
  {
    entry: {
      'cli/main': 'src/cli/main.ts',
    },
    format: ['cjs'],
    sourcemap: true,
  },
])
