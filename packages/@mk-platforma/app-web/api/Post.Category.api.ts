import { z } from "zod"
import { Categories_selector_aside_Category_queryParams } from "../client/Categories.selector.aside"
import { publicProcedure, router } from "../trpc.server.utils"

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
            .optional(),
        })
        .optional()
    )
    .query(({ ctx, input }) => {
      const hasPosts = {
        OR: [
          {
            posts: {
              some: {},
            },
          },
          {
            children: {
              some: {
                posts: {
                  some: {},
                },
              },
            },
          },
        ],
      }
      return ctx.db.post_category.findMany({
        where: {
          ...hasPosts,
          parent: {
            id: input?.parent?.id,
          },
          posts: {
            some: {
              OR: [
                {
                  title: { contains: input?.search },
                },
                {
                  description: { contains: input?.search },
                },
                {
                  contact: { contains: input?.search },
                },
              ],
            },
          },
        },
        ...Categories_selector_aside_Category_queryParams,
      })
    }),
})

export default Post_Category_api
