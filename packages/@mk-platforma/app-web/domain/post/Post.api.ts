import { z } from "zod"
import { authorizedRoute, publicProcedure, router } from "~/api_/api.server.utils"
import Post_api_create from "./Post.api.create"
import { Post_list_many } from "./Post.api.abstract"
import { SuperData_query2 } from "~/api_/api.SuperData"
import "@mk-libs/common/server-only"
import Post_api_update from "./Post.api.update"
import { eq, inArray } from "drizzle-orm"
import { post, postExpertEndorsement } from "~/drizzle/schema"
import { Drizzle_instance } from "~/drizzle/drizzle.instance"

const Post_api = router({
  list: router({
    fieldSet_main: SuperData_query2(
      Post_list_many,
      z.object({
        cursor: z.number().min(1).optional(),
      }),
      async ({ db, db_drizzle }, output1, input) => {
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
                isMain: true,
                id: true,
                url: true,
              },
            },
          },
        })

        const expertEndorsements = await getExpertEndorsments(
          db_drizzle,
          items.map(i => i.id),
        )

        const items_mapped = items.map(item => {
          const expertEndorsement = expertEndorsements.find(e => e.postId === item.id) || null
          return {
            ...item,
            expertEndorsement,
          }
        })

        const nextCursor = items_mapped.length > limit ? items_mapped.pop()!.id : null
        return { items: items_mapped, nextCursor }
      },
    ),
  }),

  single: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const post_data = await ctx.db_drizzle.query.post.findFirst({
        where: eq(post.id, input.id),
        columns: {
          id: true,
          title: true,
          isDeleted: true,
          authorId: true,
          contact: true,
          description: true,
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
          expertEndorsement: {
            columns: {
              firstName: true,
              lastName: true,
              avatarStyle: true,
              postId: true,
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

function getExpertEndorsments(db_drizzle: Drizzle_instance, posts: number[]) {
  return db_drizzle.query.postExpertEndorsement.findMany({
    where: inArray(postExpertEndorsement.postId, posts),
    columns: {
      firstName: true,
      lastName: true,
      avatarStyle: true,
      postId: true,
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
  })
}

export default Post_api
