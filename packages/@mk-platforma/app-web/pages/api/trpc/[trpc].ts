import * as trpcNext from "@trpc/server/adapters/next"
import { apiRouter } from "../../../trpc.router"
import { NextApiHandler } from "next"

// export API handler
// @see https://trpc.io/docs/api-handler
const a: NextApiHandler = trpcNext.createNextApiHandler({
  router: apiRouter,
  createContext: () => ({}),
})

export default a
