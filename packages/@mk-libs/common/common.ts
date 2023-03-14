import { isEqual, isNil, isObject, transform } from "lodash"
import { DeepPartial, DeepRequired } from "utility-types"

export function addNumbers(num1: number, num2: number) {
  return num1 + num2
}

export function assertIsNonNil<T>(val: T): asserts val is NonNullable<T> {
  if (isNil(val)) {
    throw new Error(`Expected 'val' to be defined, but received ${val}`)
  }
}

export function asNonNil<T>(val?: T) {
  assertIsNonNil(val)
  return val
}

export function parsePropertyPathFromExpression<TObject, TReturnValue>(expr: (a: TObject) => TReturnValue) {
  const firstDotIndex = expr.toString().indexOf(".")
  const cutFromLeft = expr.toString().slice(firstDotIndex + 1)
  if (cutFromLeft.endsWith("}")) return cutFromLeft.slice(0, cutFromLeft.length - 1)
  else if (cutFromLeft.endsWith(";}")) return cutFromLeft.slice(0, cutFromLeft.length - 2)
  else return cutFromLeft
}

export function graphPath<TObject, TReturnValue>(expr: (a: DeepRequired<TObject>) => TReturnValue) {
  return parsePropertyPathFromExpression(expr)
}

export function castTo<T>(val: unknown): asserts val is T {}

export function shallowPick<TType, TKey extends keyof TType>(
  object: TType,
  ...keys: TKey[]
): Pick<TType, TKey> {
  const ret: any = {}
  keys.forEach(key => {
    ret[key] = object[key]
  })
  return ret
}

export function getProperySpecifier<TObject>() {
  return function specify<TReturnValue>(expr: (a: DeepRequired<TObject>) => TReturnValue) {
    return parsePropertyPathFromExpression(expr)
  }
}

export function undefinedFor<TType>() {
  return undefined as TType | undefined
}

export function deepEquals<T = unknown>(a: T, b: T) {
  return JSON.stringify(a) === JSON.stringify(b)
}

export function eva<T>(func: () => T) {
  return func()
}

// export function isElectron(){
//   return navigator.userAgent.toLowerCase().indexOf(' electron/') > -1
// }

export function difference<T extends object>(object: T, base: T): DeepPartial<T> {
  function changes(object: T, base: T) {
    return transform(object, function (result: any, value, key) {
      if (!isEqual(value, base[key])) {
        result[key] =
          isObject(value) && isObject(base[key]) ? changes(value as any, (base as any)[key]) : value
      }
    })
  }
  return changes(object, base)
}

export function asNonNullable<T>(a: T) {
  return a === null ? undefined : (a as NonNullable<T>)
}

export function objectEntriesDeep(obj: Record<string, any>) {
  let entries: [string, any][] = []
  for (const [key, value] of Object.entries(obj)) {
    entries.push([key, value])
    if (typeof value === "object") {
      const subEntries = objectEntriesDeep(obj[key])
      const subEntriesMapped: [string, any][] = subEntries.map(([subEntryKey, subEntryValue]) => [
        key + "." + subEntryKey,
        subEntryValue,
      ])
      entries = entries.concat(subEntriesMapped)
    }
  }
  return entries
}

export const generateArray = <T>(getNext: (index: number) => T, count: number) => {
  const r: T[] = []
  for (let i = 0; i < count; i++) r.push(getNext(i))
  return r
}
