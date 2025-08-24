import { BaseTheme, createBox, createText } from '@shopify/restyle'
import * as M from 'moti'
import * as MI from 'moti/interactions'
import { ComponentProps } from 'react'
import * as RN from 'react-native'

/**
 * Creates a set of primitive components that work with the provided
 * theme type. Based on `@shopify/restyle` with Moti integration for
 * animations.
 */
export function createPrimitives<Theme extends BaseTheme>() {
  const View = createBox<Theme>()
  const Text = createText<Theme>()
  const Image = createBox<Theme, RN.ImageProps>(RN.Image)
  const Pressable = createBox<Theme, RN.PressableProps>(RN.Pressable)
  const ScrollView = createBox<Theme, RN.ScrollViewProps>(RN.ScrollView)

  // Moti-enhanced versions
  const MotiView = createBox<Theme, ComponentProps<typeof M.MotiView>>(
    M.MotiView
  )
  const MotiPressable = createBox<
    Theme,
    ComponentProps<typeof MI.MotiPressable>
  >(MI.MotiPressable)
  const MotiText = createText<Theme, ComponentProps<typeof M.MotiText>>(
    M.MotiText
  )
  const MotiImage = createBox<Theme, ComponentProps<typeof M.MotiImage>>(
    M.MotiImage
  )
  const MotiScrollView = createBox<
    Theme,
    ComponentProps<typeof M.MotiScrollView>
  >(M.MotiScrollView)

  return {
    View,
    MotiView,
    Text,
    MotiText,
    Image,
    MotiImage,
    Pressable,
    MotiPressable,
    ScrollView,
    MotiScrollView,
  }
}
