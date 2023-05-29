import * as trpcNext from "@trpc/server/adapters/next"
import { ApiRouter } from "~/api_/api.root"
import { NextApiHandler } from "next"
import { createContext } from "~/api_/api.server.utils"

// @see https://trpc.io/docs/api-handler
const handler: NextApiHandler = trpcNext.createNextApiHandler({
  router: ApiRouter,
  createContext: ({ req, res }) => createContext(req, res),
})

export default handler
