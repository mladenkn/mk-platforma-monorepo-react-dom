import { User_api } from "../domain/user/User.api"
import { createContext, router } from "~/api_/api.server.utils"
import Category_api from "../domain/category/Category.api"
import Comment_api from "~/domain/Comment.api"
import Location_api from "~/domain/Location.api"
import Post_api from "~/domain/post/Post.api"

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