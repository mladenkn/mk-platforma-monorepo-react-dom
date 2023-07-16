import { z } from "zod"
import { authorizedRoute, router } from "~/api_/api.server.utils"
import { SuperData_mapper, SuperData_query } from "~/api_/api.SuperData"
import "@mk-libs/common/server-only"

const Comment_api_many = SuperData_mapper(
  z.object({
    post_id: z.number(),
  }),
  async (_, input) => ({
    where: {
      post_id: input.post_id,
    },
  })
)

const Comment_api = router({
  many: SuperData_query(Comment_api_many, ({ db, user }, output1) =>
    db.comment
      .findMany({
        ...output1,
        select: {
          id: true,
          content: true,
          author: {
            select: {
              avatarStyle: true,
              name: true,
              id: true,
            },
          },
        },
      })
      .then(list =>
        list.map(c => ({
          ...c,
          canEdit: user?.canMutate ? c.author.id === user?.id : false,
          canDelete: user?.canMutate ? c.author.id === user?.id : false,
        }))
      )
  ),

  create: authorizedRoute(u => u.canMutate && !!u.name)
    .input(
      z.object({
        content: z.string().min(1),
        post_id: z.number(),
      })
    )
    .mutation(({ ctx, input }) =>
      ctx.db.comment.create({ data: { ...input, author_id: ctx.user.id } })
    ),

  update: authorizedRoute(u => u.canMutate && !!u.name)
    .input(
      z.object({
        content: z.string().min(1),
        id: z.number(),
      })
    )
    .mutation(({ ctx, input }) =>
      ctx.db.comment.update({
        where: { id: input.id, author_id: ctx.user.id },
        data: { content: input.content },
      })
    ),
})

export default Comment_api
