import MaskedView from '@react-native-masked-view/masked-view'
import { BaseTheme, createBox } from '@shopify/restyle'
import { ComponentProps } from 'react'

export const createMaskedView = <Theme extends BaseTheme>() =>
  createBox<Theme, ComponentProps<typeof MaskedView>>(MaskedView)
