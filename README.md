# nativ

A complete frontend stack for React Native apps that eliminates setup overhead and provides production-ready components out of the box.

## What's Included

Nativ prescribes a comprehensive React Native stack with the following technologies:

### Core Framework

- **[Expo](https://expo.dev/)** (`v54`) - Platform and tooling for universal React Native apps
- **[React Native](https://reactnative.dev/)** - Build native mobile apps using React
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript development
- **[valtio](https://valtio.pmnd.rs/)** - Proxy-state library for React with minimal boilerplate
- **[@tanstack/react-query](https://tanstack.com/query)** - Powerful data synchronization for React with caching, background updates, and optimistic updates

### Navigation & Routing

- **[expo-router](https://docs.expo.dev/router/introduction/)** (`v6`) - File-based routing for Expo apps.  
  Builds upon these packages:
  - **[@react-navigation/native](https://reactnavigation.org/)** (`v7`) - Routing and navigation library
  - **[react-native-screens](https://github.com/software-mansion/react-native-screens)** - Native navigation primitives
- **[react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context)** - Safe area insets handling

### UI & Styling

- **[@shopify/restyle](https://github.com/Shopify/restyle)** - Type-enforced system for building UI components with theme-based styling (using `@alloc/restyle` fork)
- **[@shopify/flash-list](https://shopify.github.io/flash-list/)** (`v2`) - High-performance list component for React Native
- **[expo-linear-gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/)** - Linear gradient view component
- **[expo-status-bar](https://docs.expo.dev/versions/latest/sdk/status-bar/)** - Status bar configuration
- **[expo-splash-screen](https://docs.expo.dev/versions/latest/sdk/splash-screen/)** - Splash screen management
- **[expo-system-ui](https://docs.expo.dev/versions/latest/sdk/system-ui/)** - A library that allows interacting with system UI elements
- **[react-native-keyboard-controller](https://kirillzyusko.github.io/react-native-keyboard-controller/)** - Comprehensive keyboard handling with KeyboardAvoidingView, KeyboardAwareScrollView, and more
- **[@react-native-masked-view/masked-view](https://docs.expo.dev/versions/latest/sdk/masked-view/)** - Masked view component for creating visual effects and overlays

### Animation

- **[moti](https://moti.fyi/)** - Universal animation library for React Native (using `@alloc/moti` fork).  
  Builds upon these packages:
  - **[react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/)** (`v4`) - High-performance animations and gestures
  - **[react-native-worklets](https://github.com/margelo/react-native-worklets)** - High-performance JavaScript worklets for React Native
- **[react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/)** - Declarative API exposing platform native touch and gesture system

### Database & ORM

- **[expo-sqlite](https://docs.expo.dev/versions/latest/sdk/sqlite/)** - Local SQLite database access
- **[drizzle-orm](https://orm.drizzle.team/)** (`v1`) - Lightweight TypeScript ORM with zero dependencies
- **[drizzle-plus](https://github.com/alloc/drizzle-plus)** - Utility extensions for Drizzle ORM including count(), nest(), caseWhen(), and JSON helpers

### Utilities & Helpers

- **[radashi](https://radashi.js.org/)** - Modern TypeScript utility toolkit (Lodash alternative)
- **[react-native-get-random-values](https://github.com/LinusU/react-native-get-random-values)** - Polyfill for crypto.getRandomValues()
- **[react-native-hapticlabs](https://www.npmjs.com/package/react-native-hapticlabs)** - Advanced haptic feedback library for playing custom haptic patterns
- **[@react-native-async-storage/async-storage](https://docs.expo.dev/versions/latest/sdk/async-storage/)** - Asynchronous, unencrypted, persistent, key-value storage system
- **[@react-native-community/netinfo](https://docs.expo.dev/versions/latest/sdk/netinfo/)** - Network connectivity information and monitoring

### Device & Platform APIs

- **[expo-constants](https://docs.expo.dev/versions/latest/sdk/constants/)** - System and app constants
- **[expo-device](https://docs.expo.dev/versions/latest/sdk/device/)** - Device information and capabilities
- **[expo-font](https://docs.expo.dev/versions/latest/sdk/font/)** - Font loading and management
- **[expo-image](https://docs.expo.dev/versions/latest/sdk/image/)** - Cross-platform, performant image component with advanced features like caching and format support
- **[expo-linking](https://docs.expo.dev/versions/latest/sdk/linking/)** - Deep linking and URL handling
- **[expo-localization](https://docs.expo.dev/versions/latest/sdk/localization/)** - Locale and language information
- **[expo-notifications](https://docs.expo.dev/versions/latest/sdk/notifications/)** - Local and push notifications

### Build & Development Tools

- **[react-compiler](https://react.dev/learn/react-compiler/introduction)** - Automatic memoization at compile time
- **[babel-preset-expo](https://github.com/expo/expo/tree/main/packages/babel-preset-expo)** - Babel preset for Expo projects
- **[expo-build-properties](https://docs.expo.dev/versions/latest/sdk/build-properties/)** - Configure native build properties
- **[expo-dev-client](https://docs.expo.dev/develop/development-builds/introduction/)** - Development client for custom native code

### Runtime Support

- **[react](https://react.dev/)** (`v19`) - React library for building user interfaces
- **[react-dom](https://react.dev/reference/react-dom)** - React DOM bindings (for web compatibility)
- **[@types/react](https://www.npmjs.com/package/@types/react)** - TypeScript definitions for React

## Getting Started

1. **Clone the template and create your project:**

   ```bash
   git clone https://github.com/alloc/nativ-template my-project-name --depth 1
   cd my-project-name
   ```

2. **Run the setup script:**

   > **Note:** Requires Node.js v23.6+ for TypeScript support

   ```bash
   node setup.mts
   ```

   This will:
   - Recreate the git repository
   - Install all dependencies
   - Install nativ peer dependencies
   - Clean up the setup script

   > **Note:** After dependencies are installed, you may need to run `pnpm approve-builds` to approve certain dev dependencies like esbuild and puppeteer.

3. **Customize your app metadata:**

   Edit the following files to configure your app:
   - **`package.json`**: Update app name, description, and other metadata
   - **`app.json`**: Configure bundle identifier, native permissions, and Expo plugins
   - **App Icon**: Place your app icon in `./assets/images/` folder

   For app icon and splash screen guidance, see the [Expo documentation](https://docs.expo.dev/develop/user-interface/splash-screen-and-app-icon/).

4. **Start the development server:**

   ```bash
   pnpm start
   ```

5. **Run on a platform:**
   ```bash
   pnpm ios     # iOS
   pnpm android # Android
   pnpm web     # Web
   ```

> [!IMPORTANT]
> See the [template readme](./template/README.md) to learn what else is available to you.

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
import type { Theme } from '~/theme'

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
import type { Theme } from '~/theme'
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

## License

MIT
