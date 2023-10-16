import { UseQueryResult } from "@tanstack/react-query"
import { useRouter } from "next/router"
import React, { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import env from "./env.mjs"
import Api from "./api_/api.client"
import { match } from "ts-pattern"
import { useSearchParams } from "next/navigation"

type DataOrQuery_Props<TData> = {
  input: TData | UseQueryResult<TData>
  render(data: TData): JSX.Element
  loading?: JSX.Element
  error?: JSX.Element
}

export default function DataOrQuery<TData>({
  input,
  render,
  loading = <>Loading...</>,
  error = <>"Error"</>,
}: DataOrQuery_Props<TData>) {
  if ((input as any).status) {
    const query = input as UseQueryResult<TData>
    if (query.isLoading) return loading
    else if (query.error) return error
    else return render((input as any).data)
  } else return render(input as any)
}

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
    const allCurrentParams = Object.fromEntries(searchParams.entries())
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...allCurrentParams,
          ...newParams,
        },
      },
      undefined,
      { shallow: true },
    )
  }
}

export function use_currentUser() {
  const session = useSession()
  const mock_user_id = env.NEXT_PUBLIC_MOCK_USER_ID
    ? parseInt(env.NEXT_PUBLIC_MOCK_USER_ID)
    : undefined
  const user = Api.user.single.useQuery(mock_user_id!, {
    enabled: !!mock_user_id,
  })
  if (mock_user_id) {
    return { data: user.data, isLoading: user.isLoading }
  } else {
    return { data: session.data?.user, isLoading: session.status === "loading" }
  }
}
