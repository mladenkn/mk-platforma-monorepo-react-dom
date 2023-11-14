import differenceInMilliseconds from "date-fns/differenceInMilliseconds"

// function windowEntries_push(name: string) {
//   const allResults: any[] = (window as any)[name]

//   if (!allResults) {
//     ;(window as any)[name] = []
//     return (newEntry: any) => (window as any)[name].push(newEntry)
//   }
//   return (newEntry: any) => allResults.push(newEntry)
// }

// function createNewEntryHandler(name: string) {
//   if (typeof window === "undefined") return () => {}
//   else return windowEntries_push(name)
// }

// export const inspectable = <T extends Array<any>, U>(fn: (...args: T) => U, name: string = fn.name) => {
//   const handleNewEntry = createNewEntryHandler(name)
//   return (...args: T): U => {
//     const result = fn(...args)
//     const entry = {
//       caller: getCaller(),
//       args,
//       result,
//     }
//     handleNewEntry(entry)
//     return result
//   }
// }

// export function getCaller() {
//   return new Error().stack?.split("\n")[2]
// }

export async function measurePerf_async<T>(promise: () => Promise<T>) {
  const begining = new Date()
  const result = await promise()
  const end = new Date()
  const difference = differenceInMilliseconds(end, begining)
  return [result, difference] as const
}

export function measurePerf<T>(func: () => T) {
  const begining = new Date()
  const result = func()
  const end = new Date()
  const difference = differenceInMilliseconds(end, begining)
  return [result, difference] as const
}

export function withPerfLogging_async<TResult, T extends (...args: any[]) => Promise<TResult>>(
  func: T,
) {
  return async (arg1?: unknown, arg2?: unknown, arg3?: unknown) => {
    const [result, timeDiff_millis] = await measurePerf_async(() => func(arg1, arg2, arg3))
    // @ts-ignore
    console.log(`Performance of ${func.name}: ${timeDiff_millis / 1000}`)
    return result
  }
}

export function withPerfLogging<TResult, T extends (...args: unknown[]) => TResult>(func: T) {
  return (...args: unknown[]): TResult => {
    const [result, timeDiff_millis] = measurePerf(() => func(args))
    // @ts-ignore
    console.log(`Performance of ${func.name}: ${timeDiff_millis / 1000}`)
    return result
  }
}
