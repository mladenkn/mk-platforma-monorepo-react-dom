import { Intersection, Optional } from "utility-types"


// export default function injectInto<
//   TInjectedProps,
//   TPassedProps,
//   TInjecteeReturn,
//   TInjectorProps extends (Partial<TPassedProps> & Partial<TInjectedProps>),
//   TNewComponentProps = TPassedProps & TInjectorProps
// >(
//   injectee: (fullProps: TNewComponentProps) => TInjecteeReturn,
//   injector: (injectorProps: TInjectorProps) => TInjectedProps  
// ){
//   return (newComponentProps: TNewComponentProps) => {
//     const injectedProps = (injector(newComponentProps as any) as unknown) as TInjectedProps
//     const fullProps = { ...injectedProps, ...newComponentProps }
//     return injectee(fullProps)
//   }
// }

// export default function injectInto2<
//   TInjectedProps,
//   TPassedProps,
//   TInjecteeReturn,
// >(
//   injectee: (injecteeProps: TInjectedProps & TPassedProps) => TInjecteeReturn,
//   injector: (injectorProps: TPassedProps) => TInjectedProps,
// ){
//   return (passedProps: TPassedProps & Partial<TInjectedProps>) => {
//     const injectedProps = injector(passedProps)
//     const injecteeProps = { ...injectedProps, ...passedProps }
//     return injectee(injecteeProps)
//   }
// }

export default function injectInto<
  TInjecteeProps extends object,
  TInjecteeReturn,
  TMapperReturn extends Partial<TInjecteeProps>,
  TMapperProps extends object = {},
>(
  injectee: (props: TInjecteeProps) => TInjecteeReturn,
  mapper: (props: TMapperProps) => TMapperReturn,
){
  return function(finalProps: TMapperProps & DiffOptional<TInjecteeProps, TMapperReturn>){
    const injectedProps = mapper(finalProps)
    const injecteeProps = { ...injectedProps, ...finalProps }
    return injectee((injecteeProps as any) as TInjecteeProps)
  }
}

type DiffOptional<T extends object, U extends Partial<T>> = Optional<T, keyof Intersection<T, U>>

export function withMappedProps<
  TMapperProps,
  TMappedProps,
  TInjeteeReturn,
>(
  injectee: (mappedProps: TMappedProps) => TInjeteeReturn,
  mapper: (mapperProps: TMapperProps) => TMappedProps,
){
  return function(mapperProps: TMapperProps){
    const mappedProps = mapper(mapperProps)
    return injectee(mappedProps)
  }
}

withMappedProps.createMerger = <TMapperProps, TMapperReturn>(mapper: (props: TMapperProps) => TMapperReturn) => {
  return function<TFinalProps>(){
    return function(props: TFinalProps & TMapperProps){
      return { ...props, ...mapper(props) }
    }
  }
}
