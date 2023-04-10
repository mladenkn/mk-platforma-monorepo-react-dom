import { z } from "zod"
import { CategoryLabel, Category_zod, PersonEndorsementOnly } from "../data/data.types"
import { publicProcedure, router } from "../trpc.utils"
import data from "../data/data.json"
import { castIf } from "@mk-libs/common/common"
import Post_api_create from "./Post.api.create"
import { PrismaClient } from "@prisma/client"
import { Post_category_labelSchema } from "../prisma/generated/zod"

function casted<TInput>(input: TInput) {
  return input as typeof input & { categories: CategoryLabel[]; title: string }
}

function mapPost(post: (typeof data.allPosts)[number]) {
  const mapped = castIf<{ asPersonEndorsement: PersonEndorsementOnly }>(
    post,
    post.categories[0] === "personEndorsement"
  )
    ? {
        ...post,
        title: `${post.asPersonEndorsement.firstName} ${post.asPersonEndorsement.lastName}`,
      }
    : post
  return casted(mapped)
}

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
            },
          },
        },
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
    .query(({ input }) => {
      const post = data.allPosts.find(post => post.id === input.id)
      if (!post) return post
      return mapPost(post)
    }),

  create: Post_api_create,
})

export default Post_api
