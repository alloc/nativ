import { useCallback, useEffect, useState } from 'react'

/**
 * A hook that wraps an async function with abort handling.
 *
 * @param factory A function that receives an AbortSignal and returns an async function
 * @param deps Optional dependency array that will cause the abort signal to be refreshed when changed
 * @returns An async function with identical signature to the one returned by the factory
 */
export function useAsync<T extends (...args: any[]) => Promise<any>>(
  factory: (signal: AbortSignal) => T,
  deps: readonly any[] = []
): T {
  const [controllers] = useState(() => new Set<AbortController>())

  useEffect(
    () => () => {
      controllers.forEach(controller => controller.abort())
    },
    []
  )

  return useCallback(
    ((...args: any[]) => {
      const controller = new AbortController()
      controllers.add(controller)
      return factory(controller.signal)(...args).finally(() => {
        controllers.delete(controller)
      })
    }) as T,
    deps
  )
}
