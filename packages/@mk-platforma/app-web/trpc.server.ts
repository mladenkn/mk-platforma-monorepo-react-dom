import Location_api from "./api/Location.api"
import Post_api from "./api/Post.api"
import { createContext, router } from "./trpc.server.utils"

export type Api_context = ReturnType<typeof createContext>

export const ApiRouter = router({
  post: Post_api,
  location: Location_api,
})

export const Api_ss = ApiRouter.createCaller

// Export type router type signature,
// NOT the router itself.
export type ApiRouter_type = typeof ApiRouter
