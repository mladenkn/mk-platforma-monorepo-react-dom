import { match, P } from "ts-pattern"

type Value = string | number | undefined | null

export function object_to_CookieString(obj: Record<string, Value>): string {
  const cookiePairs: string[] = []

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = match(obj[key])
        .with(P.nullish, v => "__" + v + "__")
        .with(P.string, v => encodeURIComponent(v))
        .otherwise(v => encodeURIComponent(v.toString()))

      const keyValueString = encodeURIComponent(key) + "=" + value

      cookiePairs.push(keyValueString)
    }
  }

  return cookiePairs.join("; ")
}
if (typeof window !== "undefined") (window as any).object_to_CookieString = object_to_CookieString

export function cookieString_to_object(cookieString: string) {
  const cookieObject: Record<string, Value> = {}
  const cookiePairs = cookieString.split("; ")

  for (let i = 0; i < cookiePairs.length; i++) {
    const [key, value] = cookiePairs[i].split("=")
    const value_decoded = decodeURIComponent(value)

    const value_mapped = match(value_decoded)
      .with("__undefined__", () => undefined)
      .with("__null__", () => null)
      .with(P.when(isStringANumber), parseFloat)
      .otherwise(v => v)

    cookieObject[key] = value_mapped
  }

  return cookieObject
}
if (typeof window !== "undefined") (window as any).cookieString_to_object = cookieString_to_object

function isStringANumber(str: string) {
  const number = parseFloat(str)
  return !isNaN(number)
}
