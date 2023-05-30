import { httpBatchLink } from "@trpc/client"
import { CreateTRPCNext, createTRPCNext } from "@trpc/next"
import type { ApiRouter_type } from "./api.root"
import { NextPageContext } from "next"
import superjson from "superjson"

function getBaseUrl() {
  if (typeof window !== "undefined")
    // browser should use relative path
    return ""

  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`

  if (process.env.RENDER_INTERNAL_HOSTNAME)
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`
}

const Api: CreateTRPCNext<ApiRouter_type, NextPageContext, unknown> =
  createTRPCNext<ApiRouter_type>({
    config({ ctx }) {
      return {
        links: [
          httpBatchLink({
            /**
             * If you want to use SSR, you need to use the server's full URL
             * @link https://trpc.io/docs/ssr
             **/
            url: `${getBaseUrl()}/api/trpc`, // možda se može izbacit ovo base, jer neman SSR
          }),
        ],
        /**
         * @link https://tanstack.com/query/v4/docs/reference/QueryClient
         **/
        // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
        transformer: superjson,
      }
    },
    /**
     * @link https://trpc.io/docs/ssr
     **/
    ssr: false,
  })

export default Api
