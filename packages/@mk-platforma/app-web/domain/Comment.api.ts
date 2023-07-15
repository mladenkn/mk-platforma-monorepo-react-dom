import { z } from "zod"
import { authorizedRoute, router } from "~/api_/api.server.utils"
import { CommentSchema } from "../prisma/generated/zod"
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

const Post_Comment_create_input_zod = CommentSchema.pick({
  content: true,
  post_id: true,
})

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
    .input(Post_Comment_create_input_zod)
    .mutation(({ ctx, input }) =>
      ctx.db.comment.create({ data: { ...input, author_id: ctx.user.id } })
    ),
})

export default Comment_api
