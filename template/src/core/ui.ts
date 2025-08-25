import {
  createImage,
  createMotiImage,
  createMotiScrollView,
  createMotiText,
  createMotiView,
  createPressable,
  createScrollView,
  createText,
  createView,
} from 'nativ/ui'
import type { Theme } from '~/theme'

export const View = createView<Theme>()
export const Text = createText<Theme>()
export const MotiView = createMotiView<Theme>()
export const MotiImage = createMotiImage<Theme>()
export const MotiScrollView = createMotiScrollView<Theme>()
export const MotiText = createMotiText<Theme>()
export const Pressable = createPressable<Theme>()
export const ScrollView = createScrollView<Theme>()
export const Image = createImage<Theme>()
