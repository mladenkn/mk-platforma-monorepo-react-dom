import * as trpcNext from "@trpc/server/adapters/next"
import { ApiRouter } from "../../../trpc.router"
import { NextApiHandler } from "next"

// export API handler
// @see https://trpc.io/docs/api-handler
const a: NextApiHandler = trpcNext.createNextApiHandler({
  router: ApiRouter,
  createContext: () => ({}),
})

export default a
