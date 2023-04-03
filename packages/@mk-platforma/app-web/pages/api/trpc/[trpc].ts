import * as trpcNext from "@trpc/server/adapters/next"
import { appRouter } from "../../../trpc.router"
import { NextApiHandler } from "next"

// export API handler
// @see https://trpc.io/docs/api-handler
const a: NextApiHandler = trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
})

export default a
