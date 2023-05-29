import { z } from "zod"
import { publicProcedure, router } from "~/api_/api.server.utils"
import { CommentSchema } from "../prisma/generated/zod"
import { SuperData_mapper, SuperData_query } from "~/api_/api.SuperData"

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
  many: SuperData_query(Comment_api_many, ({ db }, output1) =>
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
            },
          },
        },
      })
      .then(list => list.map(c => ({ ...c, canEdit: true, canDelete: true })))
  ),

  create: publicProcedure
    .input(Post_Comment_create_input_zod)
    .mutation(({ ctx, input }) => ctx.db.comment.create({ data: { ...input, author_id: 1 } })),
})

export default Comment_api
