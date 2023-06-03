import { createServerSideHelpers } from "@trpc/react-query/server"
import { ApiRouter } from "~/api_/api.root"
import superjson from "superjson"
import { Api_context } from "./api.server.utils"
import "@mk-libs/common/server-only"

export default function ss_utils_create(ctx: Api_context) {
  return createServerSideHelpers({
    router: ApiRouter,
    ctx,
    transformer: superjson,
  })
}
