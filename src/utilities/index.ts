export const ArrayToChunks = (array: Array<string>, chunkSize: number): Array<string>[] => {
  const items = new Array(Math.ceil(array.length / chunkSize))
  return items.fill(0).map(_ => array.splice(0, chunkSize))
}

export const getTimestamp = () => {
  const [timestamp] = new Date().toISOString().split('T')
  return timestamp
}

export const nonNullable = <T>(value: T): value is NonNullable<T> => value !== null && value !== undefined

// does string contain word regex
export function textContains(text: string, subtext: string): boolean {
  const M = text.length
  const N = subtext.length

  if (N > M) return false

  let i = 0
  let j = 0
  while (i < M && j < N) {
    if (text[i] === subtext[j]) {
      j++
    }
    i++
  }
  return j === N
}
