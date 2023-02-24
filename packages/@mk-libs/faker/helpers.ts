export const generateArray = <T>(getNext: () => T, count: number) => {
  const r: T[] = []
  for (let i = 0; i < count; i++) r.push(getNext())
  return r
}

export function randomArrayItem<T>(array: T[]){
  const index = Math.floor(Math.random() * (array.length - 1))
  return array[index]
}
