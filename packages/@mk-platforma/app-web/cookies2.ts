import { useState } from "react"
import { cookieString_to_object, object_to_cookieString } from "./cookies.convert"

type Value = string | number | undefined | null

export function use_cookie(name: string, defaultValue?: Value) {
  const [value, setValue_] = useState<Value>(
    () => cookieString_to_object(document.cookie)[name] ?? defaultValue
  )

  function setValue(value: Value) {
    const cookies_all_obj = cookieString_to_object(document.cookie)
    const cookies_all_obj__updated = { ...cookies_all_obj, [name]: value }
    document.cookie = object_to_cookieString(cookies_all_obj__updated)
    setValue_(value)
  }

  return [value, setValue]
}
