import { ExpoConfig } from 'expo/config'

const expo: ExpoConfig = {
  name: 'My Nativ App',
  slug: 'my-nativ-app',
  version: '1.0.0',
  orientation: 'portrait',
  scheme: 'my-nativ-app',
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.example.mynativapp',
    icon: {
      dark: './assets/images/ios-dark.png',
      light: './assets/images/ios-light.png',
      tinted: './assets/images/ios-tinted.png',
    },
    infoPlist: {
      NSAppTransportSecurity: {
        NSAllowsArbitraryLoads: process.env.NODE_ENV !== 'production',
      },
    },
  },
  android: {
    package: 'com.example.mynativapp',
    predictiveBackGestureEnabled: true,
    userInterfaceStyle: 'automatic',
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    'expo-localization',
    'expo-sqlite',
    ['expo-build-properties', {}],
    [
      'expo-font',
      {
        fonts: [
          './assets/fonts/InterTight[wght].ttf',
          './assets/fonts/InterTight-Italic[wght].ttf',
        ],
      },
    ],
    [
      // https://docs.expo.dev/versions/latest/sdk/splash-screen/#configurable-properties
      'expo-splash-screen',
      {
        image: './assets/images/splash-icon-light.png',
        imageWidth: 200,
        backgroundColor: '#232323',
        dark: {
          image: './assets/images/splash-icon-dark.png',
          backgroundColor: '#000000',
        },
      },
    ],
    [
      // https://docs.expo.dev/versions/latest/sdk/notifications/#configurable-properties
      'expo-notifications',
      {
        icon: './assets/images/notification-icon.png',
        color: '#ffffff',
        defaultChannel: 'default',
        sounds: ['./assets/sounds/notification.wav'],
        enableBackgroundRemoteNotifications: false,
      },
    ],
  ],
  experiments: {
    reactCompiler: true,
    tsconfigPaths: true,
    typedRoutes: true,
  },
}

export default expo
