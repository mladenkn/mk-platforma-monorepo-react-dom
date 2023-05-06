import { z } from "zod"
import { publicProcedure, router } from "../trpc.server.utils"
import { Comment_listItem_CommentSelect } from "../client/Comment.common"
import { Post_commentSchema } from "../prisma/generated/zod"
import { SuperData_mapper, SuperData_query } from "../SuperData"

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

const Post_Comment_create_input_zod = Post_commentSchema.pick({
  content: true,
  post_id: true,
})

const Comment_api = router({
  many: SuperData_query(Comment_api_many, ({ db }, output1) =>
    db.post_comment.findMany({ ...output1, select: Comment_listItem_CommentSelect })
  ),

  create: publicProcedure
    .input(Post_Comment_create_input_zod)
    .mutation(({ ctx, input }) => ctx.db.post_comment.create({ data: { ...input, author_id: 1 } })),
})

export default Comment_api
