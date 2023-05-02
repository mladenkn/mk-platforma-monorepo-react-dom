import useCookie_ from "react-use-cookie"
import cookie from "cookie"

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
