import React, { DependencyList, useRef } from 'react'
import { EffectCallback } from 'react'

const defaultOptions = { runOnFirstRender: false }

export default function useEffect(effect: EffectCallback, deps?: DependencyList, o = defaultOptions){
  const isFirstRun = useRef(true)
  React.useEffect(() => {
    if(isFirstRun.current && !o.runOnFirstRender){
      isFirstRun.current = false
      return
    }
    return effect()
  }, deps)
}