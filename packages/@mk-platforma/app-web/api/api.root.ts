import Location_api from "./Location.api"
import Post_api from "./Post.api"
import { User_api } from "../modules/user/User.api"
import { createContext, router } from "~/api/api.server.utils"
import Comment_api from "./Comment.api"
import Category_api from "../modules/category/Category.api"

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
