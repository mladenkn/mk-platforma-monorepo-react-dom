import { UseQueryResult } from "@tanstack/react-query"
import { useRouter } from "next/router"
import React, { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Api_outputs } from "./api.trpc/api.infer"

export function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: -1,
    height: -1,
  })
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    // Add event listener
    window.addEventListener("resize", handleResize)
    // Call handler right away so state gets updated with initial window size
    handleResize()
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, []) // Empty array ensures that effect is only run on mount
  return windowSize
}

export function mapQueryData<TQueryData, TMappedData>(
  query: UseQueryResult<TQueryData>,
  map: (data: TQueryData) => TMappedData,
) {
  return {
    ...query,
    data: query.data && map(query.data),
  } as UseQueryResult<TMappedData>
}

export function use_setUrlParams_shallow() {
  const router = useRouter()
  const searchParams = useSearchParams()
  return (newParams: object) => {
    const newParams_entries = Object.entries(newParams)
    const newParams_keys_nullish = newParams_entries
      .filter(([_, param_value]) => !param_value)
      .map(([param_key]) => param_key)

    const allCurrentParams = Object.fromEntries(
      Array.from(searchParams.entries()).filter(
        ([param_key]) => !newParams_keys_nullish.includes(param_key),
      ),
    )
    const newParams_nonNullish = Object.fromEntries(
      newParams_entries.filter(([_, param_value]) => param_value),
    )

    router.push(
      {
        pathname: router.pathname,
        query: {
          ...allCurrentParams,
          ...newParams_nonNullish,
        },
      },
      undefined,
      // { shallow: true },
    )
  }
}

type User = Api_outputs["user"]["single"]
export function use_currentUser() {
  return { data: undefined as User | undefined, isLoading: false }
}
