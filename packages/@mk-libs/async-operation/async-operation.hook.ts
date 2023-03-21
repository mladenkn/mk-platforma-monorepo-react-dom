import { useState } from "react"
import { AsyncOperation } from "./async-operation.types"


type UseAsyncOpArgs<TParams, TData> = {
  initialData: TData | Promise<TData>
  doOperation(params: TParams): Promise<TData>
  mapBeforeSet?(input: TData): TData
}

export default function useAsyncOperation2<TArgs extends object, TData>({
  initialData,
  doOperation: _doOperation,
  mapBeforeSet = data => data // TODO
}: UseAsyncOpArgs<TArgs, TData>) {
  const initialIsPromise = typeof (initialData as any)?.then === 'function'

  if(initialIsPromise)
    (initialData as Promise<TData>).then(onSuccess).catch(onError)

  const initialOpState = initialIsPromise ?
    { status: 'PENDING' as 'PENDING' } :
    { status: 'SUCCESS' as 'SUCCESS', data: initialData as TData }
  const [state, setState] = useState<AsyncOperation<TData>>(initialOpState)

  function onSuccess(data: TData){
    setState({ status: 'SUCCESS', data })
  }

  function onError(error: any){
    setState({ status: 'FAILURE', error })
  }

  function doOperation(args: TArgs){
    setState({ status: 'PENDING' })
    // TODO: check this
    const promise = _doOperation(args)
      .then(data => {
        onSuccess(data)
        return data
      })
    promise.catch(onError)
    return promise
  }

  function setData(data: TData){ // TODO: ovako nemože
    setState({ status: 'SUCCESS', data })
  }

  return {
    state,
    setData,
    doOperation
  }
}
