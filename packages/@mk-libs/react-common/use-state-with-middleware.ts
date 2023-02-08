import { useState as _useState, useCallback, Dispatch, SetStateAction } from "react"


export type useState_Options<T> = { onNextState?: (nextState: T) => void }

export default function useState<T>(initialValue: T, { onNextState = () => {} }: useState_Options<T> = {}){
  const [state, setState] = _useState(initialValue)

  const setStateWithMiddleware = useCallback<Dispatch<SetStateAction<T>>>(stateOrGetState => {
    if(typeof stateOrGetState === 'function'){
      setState(curState => {
        const nextState = (stateOrGetState as any)(curState)
        onNextState(nextState)
        return nextState
      })
    }
    else {
      onNextState(stateOrGetState)
      setState(stateOrGetState)
    }
  }, [onNextState])

  return [state, setStateWithMiddleware] as [typeof state, typeof setStateWithMiddleware]
}
