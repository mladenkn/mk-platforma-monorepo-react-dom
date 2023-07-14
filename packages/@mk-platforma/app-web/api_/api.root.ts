import { User_api } from "../domain/user/User.api"
import { router } from "~/api_/api.server.utils"
import Category_api from "../domain/category/Category.api"
import Comment_api from "~/domain/Comment.api"
import Location_api from "~/domain/Location.api"
import Post_api from "~/domain/post/Post.api"
import "@mk-libs/common/server-only"
import Image_api from "~/domain/Images.api"
import Auth_api from "~/domain/Auth.api"

export const ApiRouter = router({
  post: Post_api,
  location: Location_api,
  user: User_api,
  comment: Comment_api,
  category: Category_api,
  image: Image_api,
  auth: Auth_api,
})

export const Api_ss = ApiRouter.createCaller
export type Api_ss_type = ReturnType<typeof Api_ss>

// Export type router type signature,
// NOT the router itself.
export type ApiRouter_type = typeof ApiRouter
