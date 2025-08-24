import {
  BaseTheme,
  createBox,
  createText as createRestyleText,
} from '@shopify/restyle'
import { Link } from 'expo-router'
import { MotiImage, MotiScrollView, MotiText, MotiView } from 'moti'
import { MotiPressable } from 'moti/interactions'
import { ComponentProps } from 'react'
import { Image, Pressable, ScrollView } from 'react-native'

export const createView = <Theme extends BaseTheme>() => createBox<Theme>()
export const createMotiView = <Theme extends BaseTheme>() =>
  createBox<Theme, ComponentProps<typeof MotiView>>(MotiView)

export const createText = <Theme extends BaseTheme>() =>
  createRestyleText<Theme>()
export const createMotiText = <Theme extends BaseTheme>() =>
  createRestyleText<Theme, ComponentProps<typeof MotiText>>(MotiText)

export const createImage = <Theme extends BaseTheme>() =>
  createBox<Theme, ComponentProps<typeof Image>>(Image)
export const createMotiImage = <Theme extends BaseTheme>() =>
  createBox<Theme, ComponentProps<typeof MotiImage>>(MotiImage)

export const createPressable = <Theme extends BaseTheme>() =>
  createBox<Theme, ComponentProps<typeof Pressable>>(Pressable)
export const createMotiPressable = <Theme extends BaseTheme>() =>
  createBox<Theme, ComponentProps<typeof MotiPressable>>(MotiPressable)

export const createScrollView = <Theme extends BaseTheme>() =>
  createBox<Theme, ComponentProps<typeof ScrollView>>(ScrollView)
export const createMotiScrollView = <Theme extends BaseTheme>() =>
  createBox<Theme, ComponentProps<typeof MotiScrollView>>(MotiScrollView)

export const createLink = <Theme extends BaseTheme>() =>
  createRestyleText<Theme, ComponentProps<typeof Link>>(Link)

export {
  createLinearGradient,
  type LinearGradientProps,
} from './linear-gradient'

export { createFlashList } from './flash-list'

export {
  createKeyboardAvoidingView,
  createKeyboardAwareScrollView,
  createKeyboardBackgroundView,
  createKeyboardControllerView,
  createKeyboardStickyView,
} from './keyboard-view'
