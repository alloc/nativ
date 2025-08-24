import {
  BaseTheme,
  createBox,
  createText as createRestyleText,
} from '@shopify/restyle'
import * as ER from 'expo-router'
import * as M from 'moti'
import * as MI from 'moti/interactions'
import { ComponentProps } from 'react'
import * as RN from 'react-native'

export const createView = <Theme extends BaseTheme>() => createBox<Theme>()
export const createMotiView = <Theme extends BaseTheme>() =>
  createBox<Theme, ComponentProps<typeof M.MotiView>>(M.MotiView)

export const createText = <Theme extends BaseTheme>() =>
  createRestyleText<Theme>()
export const createMotiText = <Theme extends BaseTheme>() =>
  createRestyleText<Theme, ComponentProps<typeof M.MotiText>>(M.MotiText)

export const createImage = <Theme extends BaseTheme>() =>
  createBox<Theme, RN.ImageProps>(RN.Image)
export const createMotiImage = <Theme extends BaseTheme>() =>
  createBox<Theme, ComponentProps<typeof M.MotiImage>>(M.MotiImage)

export const createPressable = <Theme extends BaseTheme>() =>
  createBox<Theme, RN.PressableProps>(RN.Pressable)
export const createMotiPressable = <Theme extends BaseTheme>() =>
  createBox<Theme, ComponentProps<typeof MI.MotiPressable>>(MI.MotiPressable)

export const createScrollView = <Theme extends BaseTheme>() =>
  createBox<Theme, RN.ScrollViewProps>(RN.ScrollView)
export const createMotiScrollView = <Theme extends BaseTheme>() =>
  createBox<Theme, ComponentProps<typeof M.MotiScrollView>>(M.MotiScrollView)

export const createLink = <Theme extends BaseTheme>() =>
  createRestyleText<Theme, ER.LinkProps>(ER.Link)
