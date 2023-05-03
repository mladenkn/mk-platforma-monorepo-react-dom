import { match, P } from "ts-pattern"

export function object_to_CookieString(obj: { [key: string]: string | number }): string {
  // Create an empty array to store the key-value pairs as strings
  const cookiePairs: string[] = []

  // Iterate through the object's keys
  for (const key in obj) {
    // Check if the object has the key as its own property
    if (obj.hasOwnProperty(key)) {
      // Encode the key and value, and join them with an equal sign
      const keyValueString = encodeURIComponent(key) + "=" + encodeURIComponent(obj[key].toString())

      // Add the key-value string to the array
      cookiePairs.push(keyValueString)
    }
  }

  // Join the key-value pairs with a semicolon and a space, and return the resulting string
  return cookiePairs.join("; ")
}

export function cookieString_to_object(cookieString: string) {
  // Split the cookie string into individual key-value pairs
  const cookiePairs = cookieString.split("; ")

  // Create an empty object to store the key-value pairs
  const cookieObject: Record<string, string | number> = {}

  // Iterate through each key-value pair
  for (let i = 0; i < cookiePairs.length; i++) {
    // Split the key-value pair into key and value
    const [key, value] = cookiePairs[i].split("=")

    // Add the key-value pair to the cookie object
    const value_decoded = decodeURIComponent(value)
    const value_mapped = match(value_decoded)
      .with(P.when(isStringANumber), parseFloat)
      .otherwise(v => v)
    cookieObject[key] = value_mapped
  }

  // Return the cookie object
  return cookieObject
}

function isStringANumber(str: string) {
  const number = parseFloat(str)
  return !isNaN(number)
}
