export const apiKey = (key: keyof Env, environment?: Env) => environment?.[key] ?? process.env[key] ?? ''

export function raise(error: unknown): never {
  throw typeof error === 'string' ? new Error(error) : error
}

export const isNotFalsy = <T>(parameter: T | undefined | null | false | '' | 0 | 0n): parameter is T => !!parameter

export function sleep(milliseconds: number) {
  if (typeof Atomics === 'undefined') {
    setTimeout(() => void 0, milliseconds)
  }
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, milliseconds)
}

export const isFulfilled = <T>(promise: PromiseSettledResult<T>): promise is PromiseFulfilledResult<T> =>
  promise.status === 'fulfilled'

export const isRejected = <T>(promise: PromiseSettledResult<T>): promise is PromiseRejectedResult =>
  promise.status === 'rejected'

/**
 * @returns false if key is undefined
 */
export const strictFormatRPC = (a: string, b?: string) => (b ? `${a}/${b}` : 'false')
/**
 * @returns url without key if key is undefined
 */
export const formatRPC = (a: string, b?: string) => `${a}/${b || a}`

export const MILLISECOND = 1
export const SECOND = 1_000 * MILLISECOND
export const MINUTE = 60 * SECOND
export const HOUR = 60 * MINUTE
export const DAY = 24 * HOUR
export const milliseconds = (n: number) => n * MILLISECOND
export const seconds = (n: number) => n * SECOND
export const minutes = (n: number) => n * MINUTE
export const hours = (n: number) => n * HOUR

export function sliceToChunks<T>(array: Array<T>, chunkSize: number): Array<Array<T>> {
  const chunks = []
  for (let index = 0; index < array.length; index += chunkSize) {
    chunks.push(array.slice(index, index + chunkSize))
  }
  return chunks
}
