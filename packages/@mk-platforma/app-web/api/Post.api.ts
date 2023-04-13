import { z } from "zod"
import { publicProcedure, router } from "../trpc.server.utils"
import Post_api_create from "./Post.api.create"
import { Post_category_labelSchema } from "../prisma/generated/zod"
import { assertIsNonNil } from "@mk-libs/common/common"
import { Post_single_details_PostSelect } from "../client/Post.single.details"
import { PostList_section_PostSelect } from "../client/Post.list.section"

const Post_api = router({
  many: publicProcedure
    .input(
      z.object({
        categories: z.array(Post_category_labelSchema).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const posts = await ctx.db.post.findMany({
        where: {
          categories: input.categories && {
            some: {
              label: input.categories[0],
            },
          },
        },
        select: PostList_section_PostSelect,
      })
      return posts
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
