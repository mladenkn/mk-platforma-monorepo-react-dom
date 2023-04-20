import { z } from "zod"
import { Categories_selector_aside_Category_queryParams } from "../client/Categories.selector.aside"
import { publicProcedure, router } from "../trpc.server.utils"
import { Post_queryChunks_search } from "./Post.api"

const Post_Category_api = router({
  many: publicProcedure
    .input(
      z
        .object({
          search: z.string().optional(),
          parent: z
            .object({
              id: z.number().optional(),
            })
            .optional()
            .nullable(),
        })
        .optional()
    )
    .query(({ ctx, input }) => {
      return ctx.db.post_category.findMany({
        where: {
          OR: [
            {
              posts: {
                some: input?.search ? Post_queryChunks_search(input.search) : {},
              },
            },
            {
              children: {
                some: {
                  posts: {
                    some: input?.search ? Post_queryChunks_search(input.search) : {},
                  },
                },
              },
            },
          ],
          parent: input?.parent,
        },
        ...Categories_selector_aside_Category_queryParams,
      })
    }),
})

export default Post_Category_api
