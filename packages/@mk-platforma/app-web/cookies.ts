import useCookie from "react-use-cookie"
import { match, P } from "ts-pattern"
import { z } from "zod"
import cookie from "cookie"

const Cookies_zod = z.object({
  Post_list__location: z.number().nullable(),
  Post_list__location_radius: z.number().nullable(),
})
type Cookies = z.infer<typeof Cookies_zod>

export function getCookie_ss<TName extends keyof Cookies>(allCookies: string, cookieName: TName) {
  const allCookies_parsed = cookie.parse(allCookies)
  const value = allCookies_parsed[cookieName]
  const value_mapped = mapValue(value) as Cookies[TName]
  return value_mapped
}

export function use_cookie<TName extends keyof Cookies>(
  name: TName,
  defaultValue?: Cookies[TName]
) {
  const [value, setValue_] = useCookie(name, defaultValue as any)
  const value_mapped = mapValue(value) as Cookies[TName]

  const zodType = Cookies_zod.shape[name]

  function setValue(value: Cookies[TName]) {
    zodType.parse(value)
    setValue_(value as any)
  }

  return [value_mapped, setValue] as [typeof value_mapped, typeof setValue]
}

function mapValue(value: string | number | undefined | null) {
  return match(value)
    .with("undefined", () => undefined)
    .with("null", () => null)
    .with(
      P.when(v => typeof v === "string" && isStringANumber(v)),
      parseFloat
    )
    .with(P.union(P.nullish, P.string, P.number), v => v)
    .exhaustive()
}

function isStringANumber(str: string) {
  const number = parseFloat(str)
  return !isNaN(number)
}
