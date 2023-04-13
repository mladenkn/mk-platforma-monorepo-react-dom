import { publicProcedure, router } from "../trpc.server.utils"

const Post_category_api = router({
  many: publicProcedure.query(({ ctx, input }) => {
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

export default Post_category_api
