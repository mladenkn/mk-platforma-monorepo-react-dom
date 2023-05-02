import useCookie_ from "react-use-cookie"
import cookie from "cookie"
import { z, ZodNumber, ZodString } from "zod"
import { match, P } from "ts-pattern"
import { useCookies } from "react-cookie"

const Cookies_zod = z.object({
  Post_list__location: z.number().nullable(),
  Post_list__location_radius: z.number().nullable(),
})

type Cookies = z.infer<typeof Cookies_zod>

function useCookie2<TName extends keyof Cookies>(
  name: TName,
  defaultValue_: string | number | undefined | null
) {
  const defaultValue = match(defaultValue_)
    .with(P.string, v => v)
    .with(P.number, v => v.toString())
    .with(P._, v => v)
    .run()

  const [cookies, setCookie] = useCookies([name])
  const value_ = cookies[name]

  // const [value_, setValue_] = useCookie_(name, defaultValue)

  const b = match(Cookies_zod.shape[name])
    .with(
      P.when(v => v instanceof ZodNumber),
      () => parseInt(value_)
    )
    .with(
      P.when(v => v instanceof ZodString),
      () => value_
    )
    .run()
}

type CookieName = "Post_list__location" | "Post_list__location_radius"

export function useCookie(cookieName: CookieName, defaultValue?: string | null) {
  return useCookie_(cookieName, defaultValue ?? undefined)
}

export function useNumberCookie(cookieName: CookieName, defaultValue_?: number | null) {
  const [value_, setValue_] = useCookie(
    cookieName,
    defaultValue_ ? defaultValue_.toString() : undefined
  )
  const value = parseInt(value_)
  function setValue(value: number) {
    setValue_(value?.toString())
  }
  return [value, setValue] as [typeof value, typeof setValue]
}

export function getCookie_ss(allCookies: string, cookieName: CookieName) {
  const allCookies_parsed = cookie.parse(allCookies)
  return allCookies_parsed[cookieName] || undefined
}

export function getNumberCookie_ss(allCookies: string, cookieName: CookieName) {
  const cookie = getCookie_ss(allCookies, cookieName)
  return cookie && parseInt(cookie)
}
