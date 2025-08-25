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
import { StatusBar } from 'expo-status-bar'
import { ReactNode } from 'react'
import { useColorScheme } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { DatabaseProvider } from './DatabaseProvider'
import { FontProvider } from './FontProvider'

type UseMigrationsParams = Parameters<typeof useMigrations>

export function AppProvider<Theme extends BaseTheme>({
  db,
  fonts,
  migrations,
  queryClient,
  theme,
  children,
}: {
  db: UseMigrationsParams[0]
  fonts: Record<string, any>
  migrations: UseMigrationsParams[1]
  queryClient: QueryClient
  theme: Theme
  children: ReactNode
}) {
  const colorScheme = useColorScheme()

  return (
    <FontProvider fonts={fonts}>
      {db && migrations && <DatabaseProvider db={db} migrations={migrations} />}
      <NavigationThemeProvider
        value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <GestureHandlerRootView>
          <QueryClientProvider client={queryClient}>
            <RestyleThemeProvider theme={theme}>
              {children}
            </RestyleThemeProvider>
          </QueryClientProvider>
        </GestureHandlerRootView>
      </NavigationThemeProvider>
    </FontProvider>
  )
}
