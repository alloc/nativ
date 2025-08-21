import { fetch } from 'expo/fetch'
import { FetchResponse } from 'expo/src/winter/fetch/FetchResponse'
;(globalThis as any).fetch = fetch as any
;(globalThis as any).Response = FetchResponse as any
