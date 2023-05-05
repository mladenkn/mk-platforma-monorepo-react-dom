import { z } from "zod"
import { publicProcedure, router } from "../trpc.server.utils"
import Post_api_create from "./Post.api.create"
import { assertIsNonNil } from "@mk-libs/common/common"
import { Post_single_details_PostSelect } from "../client/Post.single.details"
import Post_comment_api from "./Post.Comment.api"
import Post_Category_api from "./Post.Category.api"
import { Prisma } from "@prisma/client"
import { Post_list_abstract } from "./Post.api.abstract.2"
import { SuperData_finalQuery } from "../SuperData"

const Post_api = router({
  list: router({
    fieldSet_main: SuperData_finalQuery(Post_list_abstract, ({ db }, output1) =>
      db.post.findMany({
        ...output1,
        select: Post_single_details_PostSelect,
      })
    ),
  }),

  single: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const post = await ctx.db.post.findUnique({
        where: { id: input.id },
        select: Post_single_details_PostSelect,
      })
      assertIsNonNil(post)
      return {
        ...post,
        comments: post.comments.map(c => ({
          ...c,
          canEdit: true,
          canDelete: true,
        })),
      }
    }),

  create: Post_api_create,

  comment: Post_comment_api,
  category: Post_Category_api,
})

export function Post_queryChunks_search(search: string): Prisma.PostWhereInput {
  return {
    OR: [
      {
        title: { contains: search, mode: "insensitive" },
      },
      {
        description: { contains: search, mode: "insensitive" },
      },
      {
        contact: { contains: search, mode: "insensitive" },
      },
    ],
  }
}

export default Post_api
