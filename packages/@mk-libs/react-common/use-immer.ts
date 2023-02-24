import produce, { Draft } from "immer"
import { useState, useCallback } from "react"

export type Updater<S> = (f: (draft: Draft<S>) => void | S) => void

export type ImmerHook<S> = [S, Updater<S>]

export function useImmer<S = any>(
  initialValue: S | (() => S)
): [S, (f: ((draft: Draft<S> | S) => void) | S) => void]

export function useImmer(initialValue: any) {
  const [val, updateValue] = useState(initialValue)
  return [
    val,
    useCallback((updater: any) => {
      if (typeof updater === "function") updateValue(produce(updater))
      else updateValue(updater)
    }, []),
  ]
}
