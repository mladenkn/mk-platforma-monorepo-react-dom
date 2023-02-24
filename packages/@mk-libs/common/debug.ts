function windowEntries_push(name: string) {
  const allResults: any[] = (window as any)[name]

  if (!allResults) {
    ;(window as any)[name] = []
    return (newEntry: any) => (window as any)[name].push(newEntry)
  }
  return (newEntry: any) => allResults.push(newEntry)
}

function createNewEntryHandler(name: string) {
  if (typeof window === "undefined") return () => {}
  else return windowEntries_push(name)
}

export const inspectable = <T extends Array<any>, U>(fn: (...args: T) => U, name: string = fn.name) => {
  const handleNewEntry = createNewEntryHandler(name)
  return (...args: T): U => {
    const result = fn(...args)
    const entry = {
      caller: getCaller(),
      args,
      result,
    }
    handleNewEntry(entry)
    return result
  }
}

export function getCaller() {
  return new Error().stack?.split("\n")[2]
}
