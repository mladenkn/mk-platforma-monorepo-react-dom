import { z } from "zod"
import { CategoryLabel } from "../data/data.types"
import { publicProcedure, router } from "../trpc.utils"
import Post_api_create from "./Post.api.create"
import { Prisma, PrismaClient } from "@prisma/client"
import { Post_category_labelSchema } from "../prisma/generated/zod"
import { assertIsNonNil } from "@mk-libs/common/common"

const Post_select = {
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
  categories: {
    select: {
      label: true,
    },
  },
  asPersonEndorsement: {
    select: {
      firstName: true,
      lastName: true,
      avatarStyle: true,
      skills: {
        select: {
          label: true,
          level: true,
        },
      },
    },
  },
} satisfies Prisma.PostSelect

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
        select: Post_select,
      })
      return posts.map(post => ({
        ...post,
        location: post.location?.name,
        categories: post.categories.map(({ label }) => label),
      }))
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
        select: Post_select,
      })
      assertIsNonNil(post)
      return {
        ...post,
        location: post.location?.name,
        categories: post.categories.map(({ label }) => label),
      }
    }),

  create: Post_api_create,
})

export default Post_api
