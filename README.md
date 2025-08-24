# nativ

Core utilities and components for React Native apps built with Expo, Restyle, and Moti.

> [!NOTE]
> It's recommended to use the [nativ-template](https://github.com/alloc/nativ-template) when creating a new project.

## Installation

```bash
pnpm add nativ
```

## Peer Dependencies

This library requires several peer dependencies to be installed in your project. You can use the built-in CLI command to install them automatically:

```bash
pnpm nativ install
```

### Generating Icon Assets

Automatically generate @2x and @3x PNG versions of SVG icons:

```bash
pnpm nativ generate-icons
```

This command:

- Scans `./assets/icons` for SVG files
- Identifies missing @2x.png and @3x.png versions
- Generates high-resolution PNG assets using [svgexport](https://github.com/piqnt/svgexport)
- Skips files that already have both versions

### Upgrading the Template

Upgrade your project to the latest version of the [nativ-template](https://github.com/alloc/nativ-template):

```bash
pnpm nativ upgrade-template
```

This command:

- Creates a patch from the last template commit your project used to the current template version
- Attempts to apply the patch to your project files
- If the patch cannot be applied cleanly, you will need to resolve merge conflicts manually
- After resolving any conflicts, you can run the command again with the `--continue` flag to finish the upgrade:

```bash
pnpm nativ upgrade-template --continue
```

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

export type Theme = typeof theme
export { theme }
```

### 3. Create UI components

```typescript
import {
  createView,
  createText,
  createPressable,
  createMotiView,
  createMotiPressable,
} from 'nativ/ui'
import { Theme } from './theme'

export const View = createView<Theme>()
export const Text = createText<Theme>()
export const Pressable = createPressable<Theme>()
export const MotiView = createMotiView<Theme>()
export const MotiPressable = createMotiPressable<Theme>()
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
import {
  createView,
  createText,
  createImage,
  createPressable,
  createScrollView,
  createMotiView,
  createMotiPressable,
  createMotiText,
  createMotiImage,
  createMotiScrollView,
} from 'nativ/ui'
import { Theme } from './theme'

const View = createView<Theme>()
const Text = createText<Theme>()
const Image = createImage<Theme>()
const Pressable = createPressable<Theme>()
const ScrollView = createScrollView<Theme>()
const MotiView = createMotiView<Theme>()
const MotiPressable = createMotiPressable<Theme>()
const MotiText = createMotiText<Theme>()
const MotiImage = createMotiImage<Theme>()
const MotiScrollView = createMotiScrollView<Theme>()
```

Factory functions exported by `nativ/ui`:

- `createView` -> `View` (Base layout component with Restyle props)
- `createText` -> `Text` (Typography with theme variants)
- `createImage` -> `Image` (Image with styling)
- `createPressable` -> `Pressable` (Touchable with styling)
- `createScrollView` -> `ScrollView` (Scrollable container with styling)
- `createMotiView` -> `MotiView` (Animated View with Moti integration)
- `createMotiPressable` -> `MotiPressable` (Animated Pressable with Moti interactions)
- `createMotiText` -> `MotiText` (Animated Text with Moti integration)
- `createMotiImage` -> `MotiImage` (Animated Image with Moti integration)
- `createMotiScrollView` -> `MotiScrollView` (Animated ScrollView with Moti integration)

### Additional UI Components

```typescript
import { Theme } from './theme'
import {
  createLinearGradient,
  createFlashList,
  createKeyboardAvoidingView,
  createKeyboardAwareScrollView,
  createKeyboardBackgroundView,
  createKeyboardControllerView,
  createKeyboardStickyView,
} from 'nativ/ui'

const LinearGradient = createLinearGradient<Theme>()
const FlashList = createFlashList<Theme>()
const KeyboardAvoidingView = createKeyboardAvoidingView<Theme>()
const KeyboardAwareScrollView = createKeyboardAwareScrollView<Theme>()
const KeyboardBackgroundView = createKeyboardBackgroundView<Theme>()
const KeyboardControllerView = createKeyboardControllerView<Theme>()
const KeyboardStickyView = createKeyboardStickyView<Theme>()
```

You can find more details about each component in the links below:

- [expo-linear-gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/)
  - `LinearGradient` - Linear gradient view with `from`/`to` props (instead of `start`/`end`) for compatibility with Restyle
- [@shopify/flash-list](https://shopify.github.io/flash-list/docs/)
  - `FlashList` - High-performance list component with Restyle props
- [react-native-keyboard-controller](https://www.npmjs.com/package/react-native-keyboard-controller)
  - [`KeyboardAvoidingView`](https://kirillzyusko.github.io/react-native-keyboard-controller/docs/api/components/keyboard-avoiding-view) - Automatically adjusts its height, position, or bottom padding based on the keyboard height to remain visible while the virtual keyboard is displayed
  - [`KeyboardAwareScrollView`](https://kirillzyusko.github.io/react-native-keyboard-controller/docs/api/components/keyboard-aware-scroll-view) - Effortlessly handles keyboard appearance, automatically scrolls to focused `TextInput` and provides a native-like performance
  - [`KeyboardBackgroundView`](https://kirillzyusko.github.io/react-native-keyboard-controller/docs/api/views/keyboard-background-view) - Visual-only utility that replicates the background of the system keyboard
  - [`KeyboardControllerView`](https://kirillzyusko.github.io/react-native-keyboard-controller/docs/api/views/keyboard-controller-view) - A plain react-native `View` with some additional methods and props
  - [`KeyboardStickyView`](https://kirillzyusko.github.io/react-native-keyboard-controller/docs/api/components/keyboard-sticky-view) - Seamlessly ensures that a designated view sticks to the keyboard's movements, maintaining visibility and interaction

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
