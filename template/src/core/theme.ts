import { createTheme } from '@shopify/restyle'

export const theme = createTheme({
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',

    white: '#ffffff',
    black: '#000000',
    gray50: '#f9fafb',
    gray100: '#f3f4f6',
    gray200: '#e5e7eb',
    gray300: '#d1d5db',
    gray400: '#9ca3af',
    gray500: '#6b7280',
    gray600: '#4b5563',
    gray700: '#374151',
    gray800: '#1f2937',
    gray900: '#111827',

    background: '#ffffff',
    foreground: '#000000',
    muted: '#f3f4f6',
    mutedForeground: '#6b7280',
    border: '#e5e7eb',
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    xxxl: 48,
  },

  borderRadii: {
    none: 0,
    xs: 6,
    sm: 10,
    md: 18,
    lg: 21,
    xl: 36,
    full: 999,
  },

  textVariants: {
    defaults: {
      fontFamily: 'InterTight',
      color: 'foreground',
    },
    heading: {
      fontFamily: 'InterTight',
      fontWeight: 'bold',
      fontSize: 24,
      color: 'foreground',
    },
    subheading: {
      fontFamily: 'InterTight',
      fontWeight: '600',
      fontSize: 18,
      color: 'foreground',
    },
    body: {
      fontFamily: 'InterTight',
      fontSize: 16,
      color: 'foreground',
    },
    caption: {
      fontFamily: 'InterTight',
      fontSize: 14,
      color: 'mutedForeground',
    },
  },
})

export type Theme = typeof theme
