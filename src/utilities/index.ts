export const ArrayToChunks = (array: Array<string>, chunkSize: number): Array<string>[] => {
  const items = Array.from({ length: Math.ceil(array.length / chunkSize) });
  return items.fill(0).map(_ => array.splice(0, chunkSize));
};

export const getTimestamp = () => {
  const [timestamp] = new Date().toISOString().split('T');
  return timestamp;
};

export const nonNullable = <T>(value: T): value is NonNullable<T> =>
  value !== null && value !== undefined;

// does string contain word regex
export function textContains(text: string, subtext: string): boolean {
  const M = text.length;
  const N = subtext.length;

  if (N > M) return false;

  let index = 0;
  let index_ = 0;
  while (index < M && index_ < N) {
    if (text[index] === subtext[index_]) {
      index_++;
    }
    index++;
  }
  return index_ === N;
}
