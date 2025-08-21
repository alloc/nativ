import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: {
      index: 'src/index.ts',
      'ui/index': 'src/ui/index.ts',
      'hooks/index': 'src/hooks/index.ts',
      'providers/index': 'src/providers/index.ts',
      'polyfills/index': 'src/polyfills/index.ts',
      'cli/index': 'src/cli/main.ts',
    },
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    clean: true,
  },
])
