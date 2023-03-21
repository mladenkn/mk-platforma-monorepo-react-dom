import { useAsyncOpContext } from './async-operation-context';
import { AsyncOperation as AsyncOperationModel } from "./async-operation.types";

type Props<TValue> = {
  model: AsyncOperationModel<TValue>
  notInitiated?: (() => JSX.Element) | 'default'
  pending?: (() => JSX.Element) | 'default'
  success?: ((value: TValue) => JSX.Element) | 'default'
  failure?: ((errMessage?: string) => JSX.Element) | 'default'
}

export default function AsyncOperationWrapper<TValue>(props: Props<TValue>): JSX.Element {

  const { defaultNotInitiated, defaultPending, defaultSuccess, defaultFailure, useDefaultsImplicitly } = useAsyncOpContext()

  if(props.model.status === 'NOT_INITIATED'){
    if(props.notInitiated === 'default' && defaultNotInitiated)
      return defaultNotInitiated()
    else if(props.notInitiated && props.notInitiated !== 'default')
      return props.notInitiated()
    else if(useDefaultsImplicitly && defaultNotInitiated)
      return defaultNotInitiated()
  }

  else if(props.model.status === 'PENDING'){
    if(props.pending === 'default' && defaultPending)
      return defaultPending()
    else if(props.pending && props.pending !== 'default')
      return props.pending()
    else if(useDefaultsImplicitly && defaultPending)
      return defaultPending()
  }

  else if(props.model.status === 'SUCCESS'){
    if(props.success === 'default' && defaultSuccess)
      return defaultSuccess(props.model.data)
    else if(props.success && props.success !== 'default')
      return props.success(props.model.data)
    else if(useDefaultsImplicitly && defaultSuccess)
      return defaultSuccess(props.model.data)
  }

  else if(props.model.status === 'FAILURE'){
    if(props.failure === 'default' && defaultFailure)
      return defaultFailure((props.model.error as any).message)
    else if(props.failure && props.failure !== 'default')
      return props.failure((props.model.error as any).message)
    else if(useDefaultsImplicitly && defaultFailure)
      return defaultFailure((props.model.error as any).message)
  }

  return <></>
}

export function Loadable<TValue>(props: Props<TValue>){
  return AsyncOperationWrapper(props)
}
