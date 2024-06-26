import { z } from "zod"
import { authorizedRoute, publicProcedure, router } from "~/api.trpc/api.server.utils"
import "@mk-libs/common/server-only"
import { eq } from "drizzle-orm"
import { User } from "~/domain/user/User.schema"

export const User_api = router({
  single_withPosts: publicProcedure.input(z.number()).query(({ ctx, input }) =>
    ctx.db.query.User.findFirst({
      where: eq(User.id, input),
      columns: {
        id: true,
        name: true,
        avatarStyle: true,
      },
      with: {
        posts: {
          columns: {
            id: true,
            title: true,
          },
          with: {
            categoryToPost: {
              with: {
                category: {
                  columns: {
                    id: true,
                    code: true,
                    label_hr: true,
                    icon_mui: true,
                  },
                },
              },
            },
          },
        },
      },
    }).then(
      user =>
        user && {
          ...user,
          canEdit: ctx.user?.canMutate ? user.id === ctx.user.id : false,
          posts: user.posts.map(post => ({
            ...post,
            categories: post.categoryToPost.map(ct => ct.category),
          })),
        },
    ),
  ),
  single: publicProcedure.input(z.number()).query(async ({ ctx, input }) => {
    const u = await ctx.db.query.User.findFirst({
      where: eq(User.id, input),
      columns: {
        id: true,
        name: true,
        avatarStyle: true,
      },
    })
    return u
  }),
  update: authorizedRoute(u => u.canMutate)
    .input(z.object({ name: z.string() }))
    .mutation(({ ctx, input }) =>
      ctx.db.update(User).set({ name: input.name }).where(eq(User.id, ctx.user.id)),
    ),
})
