import { createServerSideHelpers } from "@trpc/react-query/server"
import { ApiRouter, Api_context } from "~/my-api/api.root"
import superjson from "superjson"

export default function ss_utils_create(ctx: Api_context) {
  return createServerSideHelpers({
    router: ApiRouter,
    ctx,
    transformer: superjson,
  })
}
