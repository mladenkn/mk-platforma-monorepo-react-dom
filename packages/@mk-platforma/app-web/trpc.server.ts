import Post_api from "./api/Post.api"
import Post_comment_api from "./api/Post.comment.api"
import { initTRPC } from "@trpc/server"
import superjson from "superjson"
import db from "./prisma/instance"

export const createContext = async () => {
  return {
    db,
    userId: 1,
  }
}
export type Api_context = ReturnType<typeof createContext>

const t = initTRPC.context<typeof createContext>().create({
  transformer: superjson,
})

export const router = t.router
export const publicProcedure = t.procedure

export const ApiRouter = router({
  post: Post_api,
  post_comment: Post_comment_api,
})

export const Api_ss = ApiRouter.createCaller

// Export type router type signature,
// NOT the router itself.
export type ApiRouter_type = typeof ApiRouter
