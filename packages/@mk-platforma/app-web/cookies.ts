import useCookie_ from "react-use-cookie"

type CookieName = "Post_list__location" | "Post_list__location_radius"

export function useCookie(cookieName: CookieName, defaultValue?: string) {
  return useCookie_(cookieName, defaultValue)
}

export function useNumberCookie(cookieName: CookieName, defaultValue_?: number) {
  const [value_, setValue_] = useCookie(
    cookieName,
    defaultValue_ ? defaultValue_.toString() : undefined
  )
  const value = parseInt(value_)
  function setValue(value: number) {
    setValue_(value.toString())
  }
  return [value, setValue] as [typeof value, typeof setValue]
}
