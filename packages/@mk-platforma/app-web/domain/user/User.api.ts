import { z } from "zod"
import { authorizedRoute, publicProcedure, router } from "~/api_/api.server.utils"
import "@mk-libs/common/server-only"

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
  single: publicProcedure.input(z.number()).query(({ ctx, input }) =>
    ctx.db.user.findUnique({
      where: { id: input },
      select: {
        id: true,
        name: true,
        avatarStyle: true,
      },
    }),
  ),
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
