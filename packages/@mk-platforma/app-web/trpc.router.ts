import Post_api from "./api/Post.api"
import { router } from "./trpc.utils"

export const ApiRouter = router({
  post: Post_api,
})

export const Api_ss = ApiRouter.createCaller({})

// Export type router type signature,
// NOT the router itself.
export type ApiRouter_type = typeof ApiRouter
