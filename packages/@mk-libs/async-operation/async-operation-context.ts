import { createContext, useContext } from "react"

export type AsyncOpContextValue = {
  defaultNotInitiated?(): JSX.Element
  defaultPending?(): JSX.Element
  defaultSuccess?(value: unknown): JSX.Element
  defaultFailure?(errMessage?: string): JSX.Element
  useDefaultsImplicitly: boolean
}

export const AsyncOpContext = createContext<AsyncOpContextValue | undefined>(undefined)

export function useAsyncOpContext() {
  const v = useContext(AsyncOpContext)
  if (!v) throw new Error("AsyncOpContext not provided")
  else return v
}
