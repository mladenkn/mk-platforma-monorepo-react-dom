import { useState } from "react"
import { z } from "zod"
import { cookieString_to_object, object_to_cookieString } from "./cookies.convert"

const Cookies_zod = z.object({
  Post_list__location: z.number().nullable(),
  Post_list__location_radius: z.number().nullable(),
})
type Cookies = z.infer<typeof Cookies_zod>

export function use_cookie<TName extends keyof Cookies>(
  name: TName,
  defaultValue?: Cookies[TName]
) {
  const [value, setValue_] = useState<Cookies[TName]>(() => {
    if (typeof window !== "undefined")
      return (cookieString_to_object(document.cookie)[name] ?? defaultValue) as Cookies[TName]
    else return defaultValue as Cookies[TName]
  })

  function setValue(value: Cookies[TName]) {
    const cookies_all_obj = cookieString_to_object(document.cookie)
    const cookies_all_obj__updated = { ...cookies_all_obj, [name]: value }
    document.cookie = object_to_cookieString(cookies_all_obj__updated)
    setValue_(value)
  }

  return [value, setValue] as [typeof value, typeof setValue]
}

export function getCookie_ss<TName extends keyof Cookies>(allCookies: string, cookieName: TName) {
  const allCookies_parsed = cookieString_to_object(allCookies)
  return allCookies_parsed[cookieName] as Cookies[TName]
}
