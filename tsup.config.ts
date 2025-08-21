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
    external: [
      'react',
      'react-native',
      '@shopify/restyle',
      'moti',
      'expo-linear-gradient',
      'expo-font',
      'expo-splash-screen',
      'expo-status-bar',
      'expo-router',
      'expo-sqlite',
      'drizzle-orm',
      '@react-navigation/native',
      'react-native-get-random-values',
      'react-native-reanimated',
      'cmd-ts',
      'child_process',
      'fs',
      'path',
      'url',
    ],
  },
])
