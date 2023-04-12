import { z } from "zod"
import { publicProcedure, router } from "../trpc.utils"
import Post_api_create from "./Post.api.create"
import { Prisma, PrismaClient } from "@prisma/client"
import { Post_category_labelSchema } from "../prisma/generated/zod"
import { assertIsNonNil } from "@mk-libs/common/common"
import { Post_single_details_PostSelect } from "../client/Post.single.details"

const db = new PrismaClient()

const Post_api = router({
  many: publicProcedure
    .input(
      z.object({
        categories: z.array(Post_category_labelSchema).optional(),
      })
    )
    .query(async ({ input }) => {
      const posts = await db.post.findMany({
        where: {
          categories: input.categories && {
            some: {
              label: input.categories[0],
            },
          },
        },
        select: {
          id: true,
          title: true,
          description: true,
          contact: true,
          location: {
            select: {
              name: true,
            },
          },
          images: {
            select: {
              id: true,
              url: true,
            },
          },
          asPersonEndorsement: {
            select: {
              firstName: true,
              lastName: true,
              avatarStyle: true,
              skills: {
                select: {
                  id: true,
                  label: true,
                  level: true,
                },
              },
            },
          },
        },
      })
      return posts
    }),

  single: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ input }) => {
      const post = await db.post.findUnique({
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
