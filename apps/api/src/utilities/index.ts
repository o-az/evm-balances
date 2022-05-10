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