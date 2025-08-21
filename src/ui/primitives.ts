import { BaseTheme, createBox, createText } from '@shopify/restyle'
import * as moti from 'moti'
import { ComponentProps } from 'react'
import * as reactNative from 'react-native'

/**
 * Creates a set of primitive components that work with the provided
 * theme type. Based on `@shopify/restyle` with Moti integration for
 * animations.
 */
export function createPrimitives<Theme extends BaseTheme>() {
  const View = createBox<Theme>()
  const Text = createText<Theme>()
  const Image = createBox<Theme, reactNative.ImageProps>(reactNative.Image)
  const Pressable = createBox<Theme, reactNative.PressableProps>(
    reactNative.Pressable
  )
  const ScrollView = createBox<Theme, reactNative.ScrollViewProps>(
    reactNative.ScrollView
  )

  // Moti-enhanced versions
  const MotiView = createBox<Theme, ComponentProps<typeof moti.MotiView>>(
    moti.MotiView
  )
  const MotiText = createText<Theme, ComponentProps<typeof moti.MotiText>>(
    moti.MotiText
  )
  const MotiImage = createBox<Theme, ComponentProps<typeof moti.MotiImage>>(
    moti.MotiImage
  )
  const MotiScrollView = createBox<
    Theme,
    ComponentProps<typeof moti.MotiScrollView>
  >(moti.MotiScrollView)

  return {
    View,
    Text,
    Image,
    Pressable,
    ScrollView,
    MotiView,
    MotiText,
    MotiImage,
    MotiScrollView,
  }
}
