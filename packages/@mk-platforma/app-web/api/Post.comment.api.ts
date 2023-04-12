import { z } from "zod"
import { publicProcedure, router } from "../trpc.utils"
import { PrismaClient } from "@prisma/client"
import { Comment_listItem_CommentSelect } from "../client/Comment.common"

const db = new PrismaClient()

const Post_comment_api = router({
  many: publicProcedure
    .input(
      z.object({
        post_id: z.number(),
      })
    )
    .query(({ input }) => {
      return db.post_comment.findMany({
        where: {
          postId: input.post_id,
        },
        select: Comment_listItem_CommentSelect,
      })
    }),
})

export default Post_comment_api
