import { z } from "zod"
import { publicProcedure, router } from "../trpc.server.utils"
import { Comment_listItem_CommentSelect } from "../client/Comment.common"
import { Post_commentSchema } from "../prisma/generated/zod"

export const Post_Comment_create_input_zod = Post_commentSchema.pick({
  content: true,
  post_id: true,
})

const Comment_api = router({
  many: publicProcedure
    .input(
      z.object({
        post_id: z.number(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.db.post_comment.findMany({
        // fali canEdit, canDelete
        where: {
          post_id: input.post_id,
        },
        select: Comment_listItem_CommentSelect,
      })
    }),

  create: publicProcedure
    .input(Post_Comment_create_input_zod)
    .mutation(({ ctx, input }) => ctx.db.post_comment.create({ data: { ...input, author_id: 1 } })),
})

export default Comment_api
