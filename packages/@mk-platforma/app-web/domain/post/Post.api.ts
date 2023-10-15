import { z } from "zod"
import { authorizedRoute, publicProcedure, router } from "~/api_/api.server.utils"
import Post_api_create from "./Post.api.create"
import "@mk-libs/common/server-only"
import Post_api_update from "./Post.api.update"
import { desc, eq, inArray } from "drizzle-orm"
import { Post } from "~/drizzle/drizzle.schema"

const Input_zod = z.object({
  categories: z.array(z.number()).optional(),
  search: z.string().optional(),
  location: z.number().optional(),
  location_radius: z.number().optional().default(50),
  cursor: z.number().min(1).optional(),
})

const Post_api = router({
  list: router({
    fieldSet_main: publicProcedure.input(Input_zod).query(async ({ ctx, input }) => {
      const limit = 10

      const items_ids = await ctx.db.post
        .findMany({
          select: {
            id: true,
          },
          cursor: input.cursor
            ? {
                id: input.cursor,
              }
            : undefined,
          take: limit + 1,
          orderBy: {
            id: "desc",
          },
          where: {
            categories: input.categories?.length
              ? {
                  some: {
                    OR: [{ id: input.categories[0] }, { parent_id: input.categories[0] }],
                  },
                }
              : undefined,
            OR: input.search
              ? [
                  {
                    title: { contains: input.search, mode: "insensitive" },
                  },
                  {
                    description: { contains: input.search, mode: "insensitive" },
                  },
                  {
                    contact: { contains: input.search, mode: "insensitive" },
                  },
                ]
              : undefined,
            isDeleted: false,
            // TODO: location
          },
        })
        .then(items => items.map(i => i.id))

      const nextCursor = items_ids.length > limit ? items_ids.pop()! : null

      const items = await ctx.db_drizzle.query.Post.findMany({
        ...Post_select,
        where: inArray(Post.id, items_ids),
        orderBy: desc(Post.id),
      })

      return { items, nextCursor }
    }),
  }),

  single: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const post_data = await ctx.db_drizzle.query.Post.findFirst({
        where: eq(Post.id, input.id),
        ...Post_select,
        columns: {
          ...Post_select.columns,
          isDeleted: true,
          description: true,
          contact: true,
        },
        with: {
          ...Post_select.with,
          categoryToPost: {
            with: {
              category: {
                columns: {
                  id: true,
                  label: true,
                },
              },
            },
          },
          author: {
            columns: {
              id: true,
              name: true,
              avatarStyle: true,
            },
          },
        },
      })

      if (!post_data) return null

      return {
        ...post_data,
        categories: post_data.categoryToPost.map(ct => ct.category),
        canEdit: ctx.user?.canMutate ? post_data.author!.id === ctx.user?.id : false,
        canComment: ctx.user?.canMutate ?? false,
        canDelete: ctx.user?.canMutate ? post_data.author!.id === ctx.user?.id : false,
      }
    }),

  create: Post_api_create,
  update: Post_api_update,

  delete: authorizedRoute(u => u.canMutate)
    .input(z.number())
    .mutation(({ ctx, input }) =>
      ctx.db.post.update({ where: { id: input }, data: { isDeleted: true } }),
    ),
})

const Post_select = {
  columns: {
    id: true,
    title: true,
  },
  with: {
    location: {
      columns: {
        id: true,
        name: true,
      },
    },
    images: {
      columns: {
        isMain: true,
        id: true,
        url: true,
      },
    },
    expertEndorsement: {
      columns: {
        firstName: true,
        lastName: true,
        avatarStyle: true,
      },
      with: {
        skills: {
          columns: {
            id: true,
            label: true,
            level: true,
          },
        },
      },
    },
  },
} as const

export default Post_api

// const locations = await eva(async () => {
//   if (input.location) {
//     const { longitude, latitude } = await db.location
//       .findUnique({ where: { id: input.location } })
//       .then(asNonNil)
//     return await db.$queryRaw<{ id: number }[]>`
//       SELECT id FROM "Location" WHERE ST_DWithin(ST_MakePoint(longitude, latitude), ST_MakePoint(${longitude}, ${latitude})::geography, ${input.location_radius} * 1000)
//     `
//   }
// })
