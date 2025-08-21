import { BaseTheme, createBox } from '@shopify/restyle'
import {
  LinearGradient as ExpoLinearGradient,
  LinearGradientProps as ExpoLinearGradientProps,
  LinearGradientPoint,
} from 'expo-linear-gradient'
import { createElement } from 'react'

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

export const createLinearGradient = <Theme extends BaseTheme>() =>
  createBox<Theme, LinearGradientProps>(function LinearGradient({
    from,
    to,
    ...props
  }: LinearGradientProps) {
    return createElement(ExpoLinearGradient, {
      ...props,
      start: from,
      end: to,
    })
  })
