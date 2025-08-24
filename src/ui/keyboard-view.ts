import { BaseTheme, createBox } from '@shopify/restyle'
import { ComponentProps } from 'react'
import {
  KeyboardAvoidingView,
  KeyboardAwareScrollView,
  KeyboardBackgroundView,
  KeyboardControllerView,
  KeyboardStickyView,
} from 'react-native-keyboard-controller'

export const createKeyboardAvoidingView = <Theme extends BaseTheme>() =>
  createBox<Theme, ComponentProps<typeof KeyboardAvoidingView>>(
    KeyboardAvoidingView
  )

export const createKeyboardAwareScrollView = <Theme extends BaseTheme>() =>
  createBox<Theme, ComponentProps<typeof KeyboardAwareScrollView>>(
    KeyboardAwareScrollView
  )

export const createKeyboardBackgroundView = <Theme extends BaseTheme>() =>
  createBox<Theme, ComponentProps<typeof KeyboardBackgroundView>>(
    KeyboardBackgroundView
  )

export const createKeyboardStickyView = <Theme extends BaseTheme>() =>
  createBox<Theme, ComponentProps<typeof KeyboardStickyView>>(
    KeyboardStickyView
  )

export const createKeyboardControllerView = <Theme extends BaseTheme>() =>
  createBox<Theme, ComponentProps<typeof KeyboardControllerView>>(
    KeyboardControllerView
  )
