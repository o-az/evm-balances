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
