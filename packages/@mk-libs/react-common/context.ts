import { createContext as createContext_, useContext as useContext_ } from "react"
import { asNonNil } from "@mk-libs/common/common"

export default function createContext<TValue>() {
  const Context = createContext_<TValue | undefined>(undefined)
  const useContext = () => asNonNil(useContext_(Context))
  return [Context.Provider, useContext] as [typeof Context.Provider, typeof useContext]
}
