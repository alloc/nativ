# nativ

Core utilities and components for React Native apps built with Expo, Restyle, and Moti.

## Installation

```bash
pnpm add nativ
```

## Peer Dependencies

This library requires several peer dependencies to be installed in your project. You can use the built-in CLI command to install them automatically:

```bash
pnpm nativ install
```

### Generate Icon Assets

Automatically generate @2x and @3x PNG versions of SVG icons:

```bash
pnpm nativ generate-icons
```

This command:

- Scans `./assets/icons` for SVG files
- Identifies missing @2x.png and @3x.png versions
- Generates high-resolution PNG assets using [svgexport](https://github.com/piqnt/svgexport)
- Skips files that already have both versions

## Quick Start

### 1. Set up polyfills

Import polyfills at the top of your app entry point:

```typescript
import 'nativ/polyfills'
```

### 2. Create your theme

```typescript
import { createTheme } from '@shopify/restyle'

const theme = createTheme({
  colors: {
    primary: '#007AFF',
    white: '#ffffff',
    black: '#000000',
  },
  spacing: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
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
    },
    heading: {
      fontFamily: 'InterTight',
      fontWeight: 'bold',
      fontSize: 24,
    },
  },
})

export type AppTheme = typeof theme
export { theme }
```

### 3. Create UI primitives

```typescript
import { createPrimitives } from 'nativ/ui'
import { AppTheme } from './theme'

export const { View, Text, MotiView, Pressable, LinearGradient } =
  createPrimitives<AppTheme>()
```

### 4. Set up your app

```typescript
import { AppProvider } from 'nativ/providers'
import { theme } from './theme'
import { View, Text } from './ui'

function App() {
  return (
    <AppProvider
      theme={theme}
      fonts={{ InterTight: require('./fonts/InterTight.ttf') }}
      db={db} // optional
      migrations={migrations} // optional
    >
      <AppContent />
    </AppProvider>
  )
}

function AppContent() {
  return (
    <View flex={1} backgroundColor="white" padding="md">
      <Text variant="heading">Hello World</Text>
    </View>
  )
}
```

## API Reference

### UI Primitives

```typescript
import { createPrimitives } from 'nativ/ui'

const primitives = createPrimitives<YourTheme>()
```

Returns an object with the following components:

- `View` - Base layout component with Restyle props
- `Text` - Typography component with theme variants
- `Image` - Image component with styling
- `Pressable` - Touchable component with styling
- `ScrollView` - Scrollable container with styling
- `MotiView` - Animated View with Moti integration
- `MotiText` - Animated Text with Moti integration
- `MotiImage` - Animated Image with Moti integration
- `MotiScrollView` - Animated ScrollView with Moti integration
- `LinearGradient` - Enhanced LinearGradient with `from`/`to` props

### Hooks

```typescript
import { useAsync, useDoubleTap } from 'nativ/hooks'

// Async operations with automatic abort handling
const asyncFn = useAsync(
  signal => (id: string) => fetch(`/api/users/${id}`, { signal })
)

// Double tap detection
const handleTap = useDoubleTap({
  onDoubleTap: () => console.log('Double tap!'),
  onSingleTap: () => console.log('Single tap!'),
  delaySingle: true,
})
```

### Providers

```typescript
import { AppProvider, FontProvider, DatabaseProvider } from 'nativ/providers'

// Complete app setup
<AppProvider theme={theme} fonts={fonts} db={db} migrations={migrations}>
  {children}
</AppProvider>

// Individual providers
<FontProvider fonts={fonts}>{children}</FontProvider>
<DatabaseProvider db={db} migrations={migrations} />
```

### Polyfills

```typescript
// Import all polyfills
import 'nativ/polyfills'

// Or import specific ones
import 'nativ/polyfills/AbortSignal'
import 'nativ/polyfills/DOMException'
import 'nativ/polyfills/fetch'
import 'nativ/polyfills/react-native'
```

### Configuration

#### Metro Config

Use the pre-configured Metro bundler setup with SQL file support:

```javascript
// metro.config.js
const config = require('nativ/metro-config')
module.exports = config
```

#### Babel Preset

Use the pre-configured Babel preset with Expo, inline imports, and Reanimated:

```javascript
// babel.config.js
module.exports = {
  presets: ['nativ/babel-preset'],
}
```

## License

MIT
