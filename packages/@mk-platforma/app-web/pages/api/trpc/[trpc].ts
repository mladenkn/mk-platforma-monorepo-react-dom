import * as trpcNext from "@trpc/server/adapters/next"
import { ApiRouter } from "~/my-api/api.root"
import { NextApiHandler } from "next"
import { createContext } from "~/my-api/api.server.utils"

// @see https://trpc.io/docs/api-handler
const handler: NextApiHandler = trpcNext.createNextApiHandler({
  router: ApiRouter,
  createContext: ({ req, res }) => createContext(req, res),
})

export default handler
