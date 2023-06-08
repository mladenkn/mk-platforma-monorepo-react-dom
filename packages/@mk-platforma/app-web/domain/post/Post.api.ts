import { z } from "zod"
import { publicProcedure, router } from "~/api_/api.server.utils"
import Post_api_create from "./Post.api.create"
import { Post_list_many } from "./Post.api.abstract"
import { SuperData_query2 } from "~/api_/api.SuperData"
import "@mk-libs/common/server-only"
import Post_api_update from "./Post.api.update"

const Post_api = router({
  list: router({
    fieldSet_main: SuperData_query2(
      Post_list_many,
      z.object({
        cursor: z.number().min(1).optional(),
      }),
      async ({ db }, output1, input) => {
        const limit = 10
        const items = await db.post.findMany({
          ...output1,
          take: limit + 1,
          cursor: input.cursor
            ? {
                id: input.cursor,
              }
            : undefined,
          select: {
            id: true,
            title: true,
            location: {
              select: {
                id: true,
                name: true,
              },
            },
            images: {
              select: {
                id: true,
                url: true,
              },
            },
            expertEndorsement: {
              select: {
                firstName: true,
                lastName: true,
                avatarStyle: true,
                skills: {
                  select: {
                    id: true,
                    label: true,
                    level: true,
                  },
                },
              },
            },
          },
        })

        const nextCursor = items.length > limit ? items.pop()!.id : null
        return { items, nextCursor }
      }
    ),
  }),

  single: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const post = await ctx.db.post.findUnique({
        where: { id: input.id },
        select: {
          id: true,
          title: true,
          categories: {
            select: {
              id: true,
              label: true,
            },
          },
          location: {
            select: {
              id: true,
              name: true,
            },
          },
          contact: true,
          description: true,
          images: {
            select: {
              id: true,
              url: true,
            },
          },
          expertEndorsement: {
            select: {
              firstName: true,
              lastName: true,
              avatarStyle: true,
              skills: {
                select: {
                  id: true,
                  label: true,
                  level: true,
                },
              },
            },
          },
          comments: {
            select: {
              id: true,
              content: true,
              author: {
                select: {
                  name: true,
                  avatarStyle: true,
                  id: true,
                },
              },
            },
          },
          author: {
            select: {
              id: true,
              name: true,
              avatarStyle: true,
            },
          },
        },
      })
      if (post)
        return {
          ...post,
          canEdit: ctx.user?.canMutate ? post.author.id === ctx.user?.id : false,
          canComment: ctx.user?.canMutate ?? false,
          comments: post.comments.map(c => ({
            ...c,
            canEdit: ctx.user?.canMutate ? c.author.id === ctx.user?.id : false,
            canDelete: ctx.user?.canMutate ? c.author.id === ctx.user?.id : false,
          })),
        }
    }),

  create: Post_api_create,
  update: Post_api_update,
})

export default Post_api
