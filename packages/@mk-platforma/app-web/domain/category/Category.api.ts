import { z } from "zod"
import { SuperData_mapper, SuperData_query } from "~/api_/api.SuperData"
import { publicProcedure, router } from "~/api_/api.server.utils"
import { Post_queryChunks_search } from "../post/Post.api.abstract"
import "@mk-libs/common/server-only"

const Category_api_many = SuperData_mapper(
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
    .optional(),
  async (_, input) => ({
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
  })
)

const Category_api = router({
  many: SuperData_query(Category_api_many, ({ db }, output1) =>
    db.category.findMany({
      ...output1,
      select: Category_select,
    })
  ),
  single: publicProcedure
    .input(z.number())
    .query(({ ctx, input }) =>
      ctx.db.category.findUnique({ where: { id: input }, select: Category_select })
    ),
})

const Category_select = {
  id: true,
  label: true,
  parent: {
    select: {
      id: true,
      label: true,
      children: {
        select: {
          id: true,
          label: true,
        },
      },
      parent: {
        select: {
          id: true,
          label: true,
        },
      },
    },
  },
  children: {
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
  },
}

export default Category_api
