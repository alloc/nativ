import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    ui: 'src/ui/index.ts',
    providers: 'src/providers/index.ts',
    hooks: 'src/hooks/index.ts',
    polyfills: 'src/polyfills/index.ts',
    'cli/main': 'src/cli/main.ts',
  },
  format: ['cjs'],
  dts: true,
  sourcemap: true,
})
