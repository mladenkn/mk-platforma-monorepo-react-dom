import { initTRPC } from "@trpc/server"
import superjson from "superjson"
import Post_api from "./Posts.api"

const t = initTRPC.create({
  transformer: superjson,
})

export const router = t.router
export const publicProcedure = t.procedure

export const apiRouter = router({
  post: Post_api,
})

export const api_ss = apiRouter.createCaller({})

// Export type router type signature,
// NOT the router itself.
export type ApiRouter = typeof apiRouter
