import { httpBatchLink } from "@trpc/client"
import { CreateTRPCNext, createTRPCNext } from "@trpc/next"
import type { ApiRouter_type } from "./api.root"
import { NextPageContext } from "next"
import superjson from "superjson"
import { QueryCache } from "@tanstack/react-query"
import { enqueueSnackbar } from "notistack"

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
            url: "/api/trpc",
          }),
        ],
        /**
         * @link https://tanstack.com/query/v4/docs/reference/QueryClient
         **/
        // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
        queryClientConfig: {
          queryCache: new QueryCache({
            onError: (error: any) =>
              enqueueSnackbar(error?.message || "Nepoznata pogreška na serveru."),
          }),
        },
        transformer: superjson,
      }
    },
    /**
     * @link https://trpc.io/docs/ssr
     **/
    ssr: false,
  })

export default Api
