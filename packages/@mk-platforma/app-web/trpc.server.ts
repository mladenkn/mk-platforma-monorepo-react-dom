import Location_api from "./api/Location.api"
import Post_api from "./api/Post.api"
import { User_api } from "./api/User.api"
import { createContext, router } from "./trpc.server.utils"
import Comment_api from "./api/Comment.api"
import Category_api from "./api/Category.api"

export type Api_context = Awaited<ReturnType<typeof createContext>>

export const ApiRouter = router({
  post: Post_api,
  location: Location_api,
  user: User_api,
  comment: Comment_api,
  category: Category_api,
})

export const Api_ss = ApiRouter.createCaller

// Export type router type signature,
// NOT the router itself.
export type ApiRouter_type = typeof ApiRouter
