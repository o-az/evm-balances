export const repeatArray = <T>(array: T[], times: number) => {
  const result = []
  for (let index = 0; index < times; index++) {
    result.push(...array)
  }
  return result
}
