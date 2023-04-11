import { z } from "zod"
import { publicProcedure, router } from "../trpc.utils"
import { PrismaClient } from "@prisma/client"

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
        select: {
          id: true,
          content: true,
          author: {
            select: {
              id: true,
              name: true,
              avatarStyle: true,
            },
          },
        },
      })
    }),
})

export default Post_comment_api
