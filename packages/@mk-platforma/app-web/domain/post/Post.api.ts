import { z } from "zod"
import { authorizedRoute, publicProcedure, router } from "~/api_/api.server.utils"
import Post_api_create from "./Post.api.create"
import "@mk-libs/common/server-only"
import Post_api_update from "./Post.api.update"
import { and, desc, eq, ilike, or } from "drizzle-orm"
import { Post } from "~/drizzle/drizzle.schema"

const Input_zod = z.object({
  categories: z.array(z.number()).optional(),
  search: z.string().optional().default(""),
  location: z.number().optional(),
  location_radius: z.number().optional().default(50),
  cursor: z.number().min(1).optional(),
})

const Post_api = router({
  list: router({
    fieldSet_main: publicProcedure.input(Input_zod).query(async ({ ctx, input }) => {
      const items = await ctx.db_drizzle.query.Post.findMany({
        ...Post_select,
        where: and(
          eq(Post.isDeleted, false),
          or(
            ilike(Post.title, `%${input.search}%`),
            ilike(Post.description, `%${input.search}%`),
            ilike(Post.contact, `%${input.search}%`),
          ),
        ), // TODO: fali filter po kategorijama i po lokaciji
        limit: 20,
        orderBy: desc(Post.id),
        // TODO: fali paginacija
      })

      return { items, nextCursor: null }
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
      ctx.db_drizzle.update(Post).set({ isDeleted: true }).where(eq(Post.id, input)),
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
