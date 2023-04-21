import { z } from "zod"
import { publicProcedure, router } from "../trpc.server.utils"
import Post_api_create from "./Post.api.create"
import { assertIsNonNil } from "@mk-libs/common/common"
import { Post_single_details_PostSelect } from "../client/Post.single.details"
import { PostList_section_PostSelect } from "../client/Post.list.section"
import Post_comment_api from "./Post.Comment.api"
import Post_Category_api from "./Post.Category.api"
import { Prisma } from "@prisma/client"

const Post_api = router({
  many: publicProcedure
    .input(
      z.object({
        categories: z.array(z.number()).optional(),
        search: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      console.log(20, input)
      const posts = await ctx.db.post.findMany({
        where: {
          categories: input.categories?.length
            ? {
                some: {
                  OR: [{ id: input.categories[0] }, { parent_id: input.categories[0] }],
                },
              }
            : undefined,
          ...(input?.search ? Post_queryChunks_search(input.search) : {}),
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

  comment: Post_comment_api,
  category: Post_Category_api,
})

export function Post_queryChunks_search(search: string): Prisma.PostWhereInput {
  return {
    OR: [
      {
        title: { contains: search },
      },
      {
        description: { contains: search },
      },
      {
        contact: { contains: search },
      },
    ],
  }
}

export default Post_api
