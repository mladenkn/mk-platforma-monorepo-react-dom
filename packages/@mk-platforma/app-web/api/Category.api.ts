import { z } from "zod"
import { SuperData_mapper, SuperData_query } from "../SuperData"
import { router } from "../trpc.server.utils"
import { Post_queryChunks_search } from "./Post.api.abstract"

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
    db.post_category.findMany({
      ...output1,
      select: {
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
      },
    })
  ),
})

export default Category_api
