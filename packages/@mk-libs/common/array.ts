import { Predicate } from "./types"
import { groupBy as _groupBy } from "lodash"

export function toggleIncludes<T>(state: T[], item: T) {
  if (state.includes(item)) return state.filter(i => i !== item)
  else return [...state, item]
}

export function ensureIncludes<T>(state: T[], item: T) {
  if (!state.includes(item)) return [...state, item]
  return state
}

export function replaceWhere<T>(array: T[], filter: Predicate<T>, replacedItem: T) {
  return array.map(item => (filter(item) ? replacedItem : item))
}

export function withNoNils<T>(array: (T | undefined | null)[]) {
  return array.filter(i => i !== undefined && i !== null) as T[]
}

export function asSingleItem<T>(array: T[]) {
  if (array.length > 1) throw new Error("Expected only one item")
  else return array[0]
}

export function groupBy<TItem, TGroupingKey>(
  data: TItem[],
  getItemKey: (item: TItem) => TGroupingKey
): [TGroupingKey, TItem[]][] {
  const objectGrouping = _groupBy(data, item => JSON.stringify(getItemKey(item)))
  return Object.entries(objectGrouping).map(([key, items]) => [
    JSON.parse(key) as TGroupingKey,
    items as (typeof items)[],
  ]) as any
}

export function getRandomElement<T>(array: T[]): T {
  if (array.length === 0) {
    throw new Error("Array is empty")
  }

  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}
