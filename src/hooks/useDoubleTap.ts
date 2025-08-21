import { useRef } from 'react'
import { GestureResponderEvent } from 'react-native'

type TapState = {
  timestamp: number
  x: number
  y: number
}

const initialTapState: TapState = { timestamp: 0, x: 0, y: 0 }

export type DoubleTapOptions = {
  onDoubleTap: () => void
  onSingleTap?: () => void
  /** @default true */
  delaySingle?: boolean
}

export function useDoubleTap(arg: (() => void) | DoubleTapOptions) {
  const {
    onDoubleTap,
    onSingleTap,
    delaySingle = true,
  } = typeof arg === 'function'
    ? { onDoubleTap: arg, onSingleTap: undefined }
    : arg

  const lastTap = useRef(initialTapState)

  return (event: GestureResponderEvent) => {
    const { locationX, locationY } = event.nativeEvent

    const now = Date.now()
    const timeSinceLastTap = now - lastTap.current.timestamp

    const dx = locationX - lastTap.current.x
    const dy = locationY - lastTap.current.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (timeSinceLastTap < 300 && distance < 30) {
      onDoubleTap()

      lastTap.current = initialTapState
    } else {
      lastTap.current = { timestamp: now, x: locationX, y: locationY }

      if (onSingleTap) {
        if (delaySingle) {
          setTimeout(() => {
            if (lastTap.current.timestamp === now) {
              onSingleTap()
            }
          }, 300)
        } else {
          onSingleTap()
        }
      }
    }
  }
}
