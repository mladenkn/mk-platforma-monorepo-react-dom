import React from "react"
import { z } from "zod"
import { publicProcedure, router } from "../trpc.utils"
import { Comment_listItem_CommentSelect } from "../client/Comment.common"
import { Post_commentSchema } from "../prisma/generated/zod"
import db from "../prisma/instance"

export const Post_commonent_create_input_zod = Post_commentSchema.pick({
  content: true,
  postId: true,
})

const Post_comment_api = router({
  many: publicProcedure
    .input(
      z.object({
        post_id: z.number(),
      })
    )
    .query(({ input }) => {
      return db.post_comment.findMany({
        // fali canEdit, canDelete
        where: {
          postId: input.post_id,
        },
        select: Comment_listItem_CommentSelect,
      })
    }),

  create: publicProcedure
    .input(Post_commonent_create_input_zod)
    .mutation(({ input }) => db.post_comment.create({ data: { ...input, authorId: 1 } })),
})

export default Post_comment_api
