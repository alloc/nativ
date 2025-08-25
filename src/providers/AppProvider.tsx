import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from '@react-navigation/native'
import {
  BaseTheme,
  ThemeProvider as RestyleThemeProvider,
} from '@shopify/restyle'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import { ReactNode, useEffect, useLayoutEffect } from 'react'
import { useColorScheme } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

type UseMigrationsParams = Parameters<typeof useMigrations>

export type AppProviderProps<Theme extends BaseTheme> = {
  /**
   * The `db` instance imported from `~/db/client`.
   */
  db: UseMigrationsParams[0]
  /**
   * A mapping of font family names to font file references (using
   * `require`).
   */
  fonts: Record<string, any>
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
  theme: Theme
  /**
   * Called once the app has finished initializing.
   * - Fonts have loaded
   * - Database migrations have run
   */
  onLoad: () => void
  children: ReactNode
}

export function AppProvider<Theme extends BaseTheme>({
  db,
  fonts,
  migrations,
  queryClient,
  theme,
  onLoad,
  children,
}: AppProviderProps<Theme>) {
  const colorScheme = useColorScheme()

  const migrationState = useMigrations(db, migrations)
  const [fontsLoaded, fontsError] = useFonts(fonts)

  useEffect(() => {
    if (fontsError) {
      console.error('Fonts failed to load:', fontsError)
    }
  }, [fontsError])

  useEffect(() => {
    if (migrationState.error) {
      console.error('Database migrations failed:', migrationState.error)
    }
  }, [migrationState.error])

  const appLoaded = fontsLoaded && migrationState.success
  useLayoutEffect(() => {
    if (appLoaded) {
      onLoad()
    }
  }, [appLoaded])

  if (!appLoaded) {
    return null
  }

  return (
    <NavigationThemeProvider
      value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style="auto" />
      <GestureHandlerRootView>
        <QueryClientProvider client={queryClient}>
          <RestyleThemeProvider theme={theme}>{children}</RestyleThemeProvider>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </NavigationThemeProvider>
  )
}
