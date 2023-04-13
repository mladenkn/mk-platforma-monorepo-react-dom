import * as trpcNext from "@trpc/server/adapters/next"
import { ApiRouter } from "../../../trpc.router"
import { NextApiHandler } from "next"
import { createContext } from "../../../trpc.utils"

// export API handler
// @see https://trpc.io/docs/api-handler
const handler: NextApiHandler = trpcNext.createNextApiHandler({
  router: ApiRouter,
  createContext,
})

export default handler
