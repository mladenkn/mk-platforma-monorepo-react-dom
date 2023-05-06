import { z } from "zod"
import { publicProcedure, router } from "../trpc.server.utils"
import Post_api_create from "./Post.api.create"
import { assertIsNonNil } from "@mk-libs/common/common"
import { Post_single_details_PostSelect } from "../client/Post.single.details"
import { Post_list_abstract } from "./Post.api.abstract"
import { SuperData_query } from "../SuperData"
import { PostList_section_PostSelect } from "../client/Post.list.section"

const Post_api = router({
  list: router({
    fieldSet_main: SuperData_query(Post_list_abstract, ({ db }, output1) =>
      db.post.findMany({
        ...output1,
        select: PostList_section_PostSelect,
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
})

export default Post_api
