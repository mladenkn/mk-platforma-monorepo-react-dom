import { publicProcedure, router } from "../trpc.server.utils"

const Post_Category_api = router({
  many: publicProcedure.query(({ ctx }) => {
    return ctx.db.post_category.findMany({
      select: {
        id: true,
        label: true,
        parent: {
          select: {
            id: true,
            label: true,
          },
        },
      },
    })
  }),
})

export default Post_Category_api