import { useFonts } from 'expo-font'
import { SplashScreen } from 'expo-router'
import { ReactNode } from 'react'

// Keep the splash screen visible until the fonts have loaded.
SplashScreen.preventAutoHideAsync()

export function FontProvider({
  fonts,
  children,
}: {
  fonts: Record<string, any>
  children: ReactNode
}) {
  const [fontsReady, fontsError] = useFonts(fonts)

  if (fontsError) {
    console.error(fontsError)
  }

  if (fontsReady || fontsError) {
    SplashScreen.hideAsync()
    return children
  }

  return null
}
