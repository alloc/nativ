import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from '@react-navigation/native'
import {
  BaseTheme,
  ThemeProvider as RestyleThemeProvider,
} from '@shopify/restyle'
import {
  focusManager,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator'
import { StatusBar } from 'expo-status-bar'
import { ReactNode, useEffect, useLayoutEffect } from 'react'
import { AppState, Platform, useColorScheme } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

type UseMigrationsParams = Parameters<typeof useMigrations>

export type AppProviderProps = {
  /**
   * The `db` instance imported from `~/db/client`.
   */
  db: UseMigrationsParams[0]
  /**
   * The default export of `~/db/migrations`.
   */
  migrations: UseMigrationsParams[1]
  /**
   * The `queryClient` instance imported from `~/queryClient`.
   */
  queryClient: QueryClient
  /**
   * The `theme` object imported from `~/theme`.
   */
  theme: BaseTheme | { light: BaseTheme; dark: BaseTheme; default?: BaseTheme }
  /**
   * Called once the app has finished initializing.
   * - Database migrations have run
   */
  onLoad: () => void
}

export function AppProvider({
  db,
  migrations,
  queryClient,
  theme,
  onLoad,
  children,
}: AppProviderProps & {
  children: ReactNode
}) {
  const colorScheme = useColorScheme()

  // Enable auto refetch on app focus
  useEffect(() => {
    if (Platform.OS !== 'web') {
      const subscription = AppState.addEventListener('change', status =>
        focusManager.setFocused(status === 'active')
      )
      return () => subscription.remove()
    }
  }, [])

  const migrationTask = useMigrations(db, migrations)
  if (migrationTask.error) {
    throw migrationTask.error
  }

  const allowRender = migrationTask.success
  useLayoutEffect(() => void (allowRender && onLoad()), [allowRender])

  if (!allowRender) {
    return null
  }

  return (
    <NavigationThemeProvider
      value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style="auto" />
      <GestureHandlerRootView>
        <QueryClientProvider client={queryClient}>
          <RestyleThemeProvider
            theme={
              (colorScheme === 'dark'
                ? theme.dark
                : colorScheme === 'light'
                  ? theme.light
                  : theme.default || theme.light) || theme
            }>
            {children}
          </RestyleThemeProvider>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </NavigationThemeProvider>
  )
}
