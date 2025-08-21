import * as shopify from '@shopify/flash-list'
import { BaseTheme, BoxProps, createBox } from '@shopify/restyle'
import { ReactNode, RefAttributes } from 'react'

export const createFlashList = <Theme extends BaseTheme>() =>
  createBox<Theme>(shopify.FlashList) as <TItem>(
    props: BoxProps<Theme> &
      shopify.FlashListProps<TItem> &
      RefAttributes<shopify.FlashListRef<TItem>>
  ) => ReactNode
