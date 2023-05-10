import * as trpcNext from "@trpc/server/adapters/next"
import { ApiRouter } from "../../../api/api.root"
import { NextApiHandler } from "next"
import { createContext } from "../../../api.server.utils"

// export API handler
// @see https://trpc.io/docs/api-handler
const handler: NextApiHandler = trpcNext.createNextApiHandler({
  router: ApiRouter,
  createContext,
})

export default handler
