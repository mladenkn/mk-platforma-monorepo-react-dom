import * as trpcNext from "@trpc/server/adapters/next"
import { ApiRouter } from "../../../trpc.server"
import { NextApiHandler } from "next"
import { createContext } from "../../../trpc.server.utils"

// export API handler
// @see https://trpc.io/docs/api-handler
const handler: NextApiHandler = trpcNext.createNextApiHandler({
  router: ApiRouter,
  createContext,
})

export default handler
