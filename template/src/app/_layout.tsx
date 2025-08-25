import 'nativ/polyfills'

import { SplashScreen, Stack } from 'expo-router'
import { AppProvider } from 'nativ/providers'

import { db } from '~/db/client'
import migrations from '~/db/migrations'
import { queryClient } from '~/queryClient'
import { theme } from '~/theme'

const fonts = {
  InterTight: require('~/fonts/InterTight[wght].ttf'),
}

// Keep the splash screen visible until the app is loaded.
SplashScreen.preventAutoHideAsync()

export default function AppLayout() {
  return (
    <AppProvider
      db={db}
      fonts={fonts}
      migrations={migrations}
      theme={theme}
      queryClient={queryClient}
      onLoad={() => SplashScreen.hideAsync()}>
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
