import { z } from "zod"
import { CategoryLabel, Category_zod, PersonEndorsementOnly } from "../data/data.types"
import { publicProcedure, router } from "../trpc.utils"
import data from "../data/data.json"
import { castIf } from "@mk-libs/common/common"
import Post_api_create from "./Post.api.create"

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

const Post_api = router({
  many: publicProcedure
    .input(
      z.object({
        categories: z.array(Category_zod).optional(),
      })
    )
    .query(({ input }) =>
      data.allPosts
        .map(mapPost)
        .filter(post =>
          input.categories
            ? input.categories.every(requiredCategory => post.categories.includes(requiredCategory))
            : true
        )
    ),

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
