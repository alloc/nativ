import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from '@react-navigation/native'
import { ThemeProvider as RestyleThemeProvider } from '@shopify/restyle'
import { StatusBar } from 'expo-status-bar'
import { ReactNode } from 'react'
import { useColorScheme } from 'react-native'
import { DatabaseProvider } from './DatabaseProvider'
import { FontProvider } from './FontProvider'

export function AppProvider<Theme>({
  theme,
  fonts,
  db,
  migrations,
  children,
}: {
  theme: Theme
  fonts: Record<string, any>
  db?: any
  migrations?: any
  children: ReactNode
}) {
  const colorScheme = useColorScheme()

  return (
    <FontProvider fonts={fonts}>
      {db && migrations && <DatabaseProvider db={db} migrations={migrations} />}
      <NavigationThemeProvider
        value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <RestyleThemeProvider theme={theme}>{children}</RestyleThemeProvider>
      </NavigationThemeProvider>
    </FontProvider>
  )
}
