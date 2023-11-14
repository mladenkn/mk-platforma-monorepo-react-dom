import { useEffect, useRef } from "react"
import { last } from "lodash"

export default function use_history_uniques<T>(value: T) {
  const history = useRef<T[]>([])
  const history_lastItem = last(history.current)
  useEffect(() => {
    if (history_lastItem !== value) {
      history.current.push(value)
    }
  }, [value])
  if (history_lastItem !== value) {
    return [...history.current, value]
  } else {
    return history.current
  }
}
