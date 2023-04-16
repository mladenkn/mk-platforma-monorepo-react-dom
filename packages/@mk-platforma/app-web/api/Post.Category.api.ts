import { Categories_selector_aside_Category_queryParams } from "../client/Categories.selector.aside"
import { publicProcedure, router } from "../trpc.server.utils"

const Post_Category_api = router({
  many: publicProcedure.query(({ ctx }) => {
    return ctx.db.post_category.findMany(Categories_selector_aside_Category_queryParams)
  }),
})

export default Post_Category_api
