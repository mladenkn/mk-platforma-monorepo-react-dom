import { useRef } from "react"

export default function useRenderCount(){
  const ref = useRef(1)
  return ref.current++
}
