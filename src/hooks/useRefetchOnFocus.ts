import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useRef } from 'react'

/**
 * Re-fetches a query when the screen is re-focused.
 */
export function useRefetchOnFocus<T>(fetch: () => Promise<T>) {
  const refetch = useRef<typeof fetch>(null)

  useFocusEffect(
    useCallback(() => {
      /**
       * There are two scenarios where refetching should not occur:
       *   1. The first time the screen is focused
       *   2. The fetch function has changed
       *
       * In both cases, react-query handles the fetching.
       */
      if (refetch.current === fetch) {
        refetch.current()
      } else {
        refetch.current = fetch
      }
    }, [fetch])
  )
}
