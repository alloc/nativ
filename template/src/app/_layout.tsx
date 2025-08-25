import 'nativ/polyfills'

import { Stack } from 'expo-router'
import { AppProvider } from 'nativ/providers'

import { db } from '~/db/client'
import migrations from '~/db/migrations'
import { theme } from '~/theme'

const fonts = {
  InterTight: require('~/fonts/InterTight[wght].ttf'),
}

export default function AppLayout() {
  return (
    <AppProvider theme={theme} fonts={fonts} db={db} migrations={migrations}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </AppProvider>
  )
}

// Use the default error boundary from expo-router.
export { ErrorBoundary } from 'expo-router'
