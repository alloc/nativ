import { FlashList, FlashListProps, FlashListRef } from '@shopify/flash-list'
import { BaseTheme, BoxProps, createBox } from '@shopify/restyle'
import { ReactNode, RefAttributes } from 'react'

export const createFlashList = <Theme extends BaseTheme>() =>
  createBox<Theme>(FlashList) as <TItem>(
    props: BoxProps<Theme> &
      FlashListProps<TItem> &
      RefAttributes<FlashListRef<TItem>>
  ) => ReactNode
