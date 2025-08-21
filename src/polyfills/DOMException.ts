;(globalThis as any).DOMException = class DOMException extends Error {
  constructor(message: string, name: string) {
    super(message)
    this.name = name
  }
}
