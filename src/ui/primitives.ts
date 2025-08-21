import { createBox, createText } from '@shopify/restyle'
import {
  LinearGradient as ExpoLinearGradient,
  LinearGradientProps as ExpoLinearGradientProps,
  LinearGradientPoint,
} from 'expo-linear-gradient'
import * as moti from 'moti'
import { ComponentProps, createElement } from 'react'
import * as reactNative from 'react-native'

export interface LinearGradientProps
  extends Omit<ExpoLinearGradientProps, 'start' | 'end'> {
  /**
   * For example, `{ x: 0.1, y: 0.2 }` means that the gradient will
   * start `10%` from the left and `20%` from the top.
   *
   * **On web**, this only changes the angle of the gradient because
   * CSS gradients don't support changing the starting position.
   *
   * @default { x: 0.5, y: 0.0 }
   */
  from?: LinearGradientPoint | null
  /**
   * For example, `{ x: 0.1, y: 0.2 }` means that the gradient will
   * end `10%` from the left and `20%` from the bottom.
   *
   * **On web**, this only changes the angle of the gradient because
   * CSS gradients don't support changing the end position.
   *
   * @default { x: 0.5, y: 1.0 }
   */
  to?: LinearGradientPoint | null
}

/**
 * Creates a set of primitive components that work with the provided theme type.
 * Based on @shopify/restyle with Moti integration for animations.
 */
export function createPrimitives<Theme>() {
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

  /**
   * Same as `LinearGradient` from `expo-linear-gradient` **except** the
   * `start`/`end` props are renamed to `from`/`to`, due to a conflict
   * with `@shopify/restyle` props.
   */
  const LinearGradient = createBox<Theme, LinearGradientProps>(
    function LinearGradient({ from, to, ...props }: LinearGradientProps) {
      return createElement(ExpoLinearGradient, {
        ...props,
        start: from,
        end: to,
      })
    }
  )

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
    LinearGradient,
  }
}

export type PrimitivesReturnType<Theme> = ReturnType<
  typeof createPrimitives<Theme>
>
