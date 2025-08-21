import { BaseTheme, createBox } from '@shopify/restyle'
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
  KeyboardBackgroundView,
  KeyboardBackgroundViewProps,
  KeyboardControllerProps,
  KeyboardControllerView,
  KeyboardStickyView,
  KeyboardStickyViewProps,
} from 'react-native-keyboard-controller'

export const createKeyboardAvoidingView = <Theme extends BaseTheme>() =>
  createBox<Theme, KeyboardAvoidingViewProps>(KeyboardAvoidingView)

export const createKeyboardAwareScrollView = <Theme extends BaseTheme>() =>
  createBox<Theme, KeyboardAwareScrollViewProps>(KeyboardAwareScrollView)

export const createKeyboardBackgroundView = <Theme extends BaseTheme>() =>
  createBox<Theme, KeyboardBackgroundViewProps>(KeyboardBackgroundView)

export const createKeyboardStickyView = <Theme extends BaseTheme>() =>
  createBox<Theme, KeyboardStickyViewProps>(KeyboardStickyView)

export const createKeyboardControllerView = <Theme extends BaseTheme>() =>
  createBox<Theme, KeyboardControllerProps>(KeyboardControllerView)
