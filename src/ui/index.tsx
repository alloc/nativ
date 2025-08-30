import {
  BoxProps,
  boxRestyleFunctions,
  composeRestyleFunctions,
  createBox,
  createText as createRestyleText,
  ResponsiveColor,
  useResponsiveProp,
  useRestyle,
  type BaseTheme,
} from '@shopify/restyle'
import { Image, type ImageStyle } from 'expo-image'
import { Link } from 'expo-router'
import { motify, MotiScrollView, MotiText, MotiView } from 'moti'
import { MotiPressable } from 'moti/interactions'
import { forwardRef, Ref, type ComponentProps } from 'react'
import { Pressable, ScrollView, TextInput } from 'react-native'

export const createView = <Theme extends BaseTheme>() => createBox<Theme>()

export const createMotiView = <Theme extends BaseTheme>() =>
  createBox<Theme, ComponentProps<typeof MotiView>>(MotiView)

export const createText = <Theme extends BaseTheme>() =>
  createRestyleText<Theme>()

export const createMotiText = <Theme extends BaseTheme>() =>
  createRestyleText<Theme, ComponentProps<typeof MotiText>>(MotiText)

export const createImage = <Theme extends BaseTheme>() => {
  type ImageProps = Omit<ComponentProps<typeof Image>, 'tintColor'> & {
    /**
     * A color used to tint template images (a bitmap image where only the opacity matters).
     * The color is applied to every non-transparent pixel, causing the image's shape to adopt that color.
     * This effect is not applied to placeholders.
     * @default null
     */
    tintColor?: ResponsiveColor<Theme> | null
  }

  const restyleProps = composeRestyleFunctions(boxRestyleFunctions)

  const RestyleImage = forwardRef(function RestyleImage(
    props: BoxProps<Theme> & Omit<ImageProps, keyof BoxProps<Theme>>,
    ref: Ref<Image>
  ) {
    return (
      <Image
        {...useRestyle(restyleProps as any, props)}
        tintColor={useResponsiveProp(props.tintColor, 'colors')}
        ref={ref}
      />
    )
  })

  return copyStaticMembers(RestyleImage, Image) as typeof RestyleImage &
    StaticMembers<typeof Image>
}

export const createMotiImage = <Theme extends BaseTheme>() => {
  const MotiImage = motify<
    ComponentProps<typeof Image>,
    typeof Image,
    ImageStyle
  >(Image)()

  return createBox<Theme, ComponentProps<typeof MotiImage>, typeof Image>(
    MotiImage
  )
}

export const createPressable = <Theme extends BaseTheme>() =>
  createBox<Theme, ComponentProps<typeof Pressable>>(Pressable)

export const createMotiPressable = <Theme extends BaseTheme>() =>
  createBox<Theme, ComponentProps<typeof MotiPressable>>(MotiPressable)

export const createScrollView = <Theme extends BaseTheme>() =>
  createBox<Theme, ComponentProps<typeof ScrollView>, typeof ScrollView>(
    ScrollView
  )

export const createMotiScrollView = <Theme extends BaseTheme>() =>
  createBox<Theme, ComponentProps<typeof MotiScrollView>, typeof ScrollView>(
    MotiScrollView
  )

export const createTextInput = <Theme extends BaseTheme>() =>
  createBox<Theme, ComponentProps<typeof TextInput>, typeof TextInput>(
    TextInput
  )

export const createLink = <Theme extends BaseTheme>() =>
  createRestyleText<Theme, ComponentProps<typeof Link>>(Link)

const ignoredStaticMembers = {
  length: true,
  name: true,
  prototype: true,
}

type StaticMembers<T> = {
  [K in Exclude<keyof T, keyof typeof ignoredStaticMembers>]: T[K]
}

function copyStaticMembers<T extends object>(target: T, source: object) {
  Object.getOwnPropertyNames(source).forEach(name => {
    if (!(name in ignoredStaticMembers)) {
      Object.defineProperty(
        target,
        name,
        Object.getOwnPropertyDescriptor(source, name)!
      )
    }
  })
  return target
}
