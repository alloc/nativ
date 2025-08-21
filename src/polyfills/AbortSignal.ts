function any(signals: any[]) {
  const controller = new (globalThis as any).AbortController()

  // Abort immediately if any are already aborted.
  const abortedSignal = signals.find(signal => signal.aborted)
  if (abortedSignal) {
    controller.abort()
    return controller.signal
  }

  const onAbort = () => {
    controller.abort()

    for (const signal of signals) {
      signal.removeEventListener('abort', onAbort)
    }
  }

  for (const signal of signals) {
    signal.addEventListener('abort', onAbort)
  }

  return controller.signal
}

Object.defineProperty((globalThis as any).AbortSignal, 'any', {
  value: any,
  configurable: true,
})
