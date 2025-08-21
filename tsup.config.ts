import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    ui: 'src/ui/index.ts',
    hooks: 'src/hooks/index.ts',
    providers: 'src/providers/index.ts',
    polyfills: 'src/polyfills/index.ts',
    'cli/main': 'src/cli/main.ts',
  },
  format: ['cjs'],
  dts: true,
  sourcemap: true,
})
