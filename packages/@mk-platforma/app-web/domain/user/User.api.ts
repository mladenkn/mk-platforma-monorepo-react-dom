import { z } from "zod"
import { authorizedRoute, publicProcedure, router } from "~/api_/api.server.utils"
import "@mk-libs/common/server-only"
import { eq } from "drizzle-orm"
import { user } from "~/drizzle/schema"

export const User_api = router({
  single_withPosts: publicProcedure.input(z.number()).query(({ ctx, input }) =>
    ctx.db.user
      .findUnique({
        where: { id: input },
        select: {
          id: true,
          name: true,
          avatarStyle: true,
          posts: {
            select: {
              id: true,
              title: true,
              categories: {
                select: {
                  id: true,
                  label: true,
                },
              },
            },
          },
        },
      })
      .then(r => r && { ...r, canEdit: ctx.user?.canMutate ? r.id === ctx.user.id : false }),
  ),
  single: publicProcedure.input(z.number()).query(async ({ ctx, input }) => {
    // return ctx.db.user.findUnique({
    //   where: { id: input },
    //   select: {
    //     id: true,
    //     name: true,
    //     avatarStyle: true,
    //   },
    // })
    const u = await ctx.db_drizzle.query.user.findFirst({
      where: eq(user.id, input),
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
      ctx.db.user.update({
        where: {
          id: ctx.user.id,
        },
        data: {
          name: input.name,
        },
      }),
    ),
})
