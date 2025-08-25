import 'nativ/polyfills'

import { SplashScreen, Stack } from 'expo-router'
import { AppProvider } from 'nativ/providers'
import { ActivityIndicator } from 'react-native'

import { Suspense } from 'react'
import { db } from '~/db/client'
import migrations from '~/db/migrations'
import { queryClient } from '~/queryClient'
import { theme } from '~/theme'
import { View } from '~/ui'

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
      <Suspense fallback={<SuspenseFallback />}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </Suspense>
    </AppProvider>
  )
}

function SuspenseFallback() {
  return (
    <View flex={1} justifyContent="center" alignItems="center">
      <ActivityIndicator size="small" />
    </View>
  )
}

// Use the default error boundary from expo-router.
export { ErrorBoundary } from 'expo-router'
