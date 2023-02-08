import { Dispatch, SetStateAction } from "react";
import { Predicate, ValueOrMapValue } from "@mk-libs/common/types";
import useState, { useState_Options } from "@mk-libs/react-common/use-state-with-middleware";


export function createArrayUpdater<T>(set: Dispatch<SetStateAction<T[]>>): ArrayUpdater<T>{
  function _updateWhere(array: T[], filter: Predicate<T>, valueOrMapValue: ValueOrMapValue<T>){
    return array.map(item => {
      if(filter(item)){
        const itemMapped = typeof valueOrMapValue === 'function' ? (valueOrMapValue as any)(item) : valueOrMapValue
        return itemMapped
      }
      return item
    })
  }

  function updateOrPush(filter: Predicate<T>, valueOrMapValue: ValueOrMapValue<T>){
    set(arr => {
      const filtered = arr.filter(filter)
      if(filtered.length){
        return _updateWhere(arr, filter, valueOrMapValue)
      }
      else {
        // TODO: assert not a function
        return [...arr, valueOrMapValue as T]
      }
    })
  }

  function updateWhere(filter: Predicate<T>, valueOrMapValue: ValueOrMapValue<T>){
    set(arr => _updateWhere(arr, filter, valueOrMapValue))
  }

  function removeWhere(filter: Predicate<T>){
    set(arr => arr.filter(i => !filter(i)))
  }

  return {
    set,
    empty: () => set([]),
    replace: (list: T[]) => set(list),
    push: (item: T) => set(l => [...l, item]),
    updateWhere,
    updateOrPush,
    setAt: (index: number, value: T) => set(l =>
      [...l.slice(0, index), value, ...l.slice(index + 1)]
    ),
    removeWhere,
    removeAt: (index: number) => set(l => [...l.slice(0, index), ...l.slice(index + 1)]),
    filter: (predicate: Predicate<T>) => set(l => l.filter(predicate)),
    reverse: () => set(l => [...l].reverse()),
    concat: (arr: T[]) => set(l => [...l].concat([...arr])),
    // sort: (sortFn) => set(l => [...l].sort(sortFn)),
  }
}

export type ArrayUpdater<T> = {
  set: Dispatch<SetStateAction<T[]>>
  empty: () => void,
  replace: (list: T[]) => void
  push: (item: T) => void
  updateWhere(filter: Predicate<T>, valueOrMapValue: ValueOrMapValue<T>): void
  updateOrPush(filter: Predicate<T>, valueOrMapValue: ValueOrMapValue<T>): void
  setAt: (index: number, value: T) => void
  removeWhere: (filter: Predicate<T>) => void
  removeAt: (index: number) => void
  filter: (predicate: Predicate<T>) => void
  reverse: () => void
  concat: (arr: T[]) => void
}

export function useArray<T>(initialValue: T[], useState_Options?: useState_Options<T[]>){
  const [state, setState] = useState<T[]>(initialValue, useState_Options)
  const updater = createArrayUpdater<T>(setState)
  return [state, updater] as [typeof state, typeof updater]
}
