import { useRef } from "react"
import useEffect from "./use-effect"

export default function use_history_uniques<T>(value: T) {
  const history = useRef<T[]>([])
  useEffect(
    () => {
      history.current.push(value)
    },
    [value],
    { runOnFirstRender: true }
  )
  const history_lastItem = history.current[history.current.length - 1]
  if (history_lastItem !== value) {
    return [...history.current, value]
  } else {
    return history.current
  }
}
