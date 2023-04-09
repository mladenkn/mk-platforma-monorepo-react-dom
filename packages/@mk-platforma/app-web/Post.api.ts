import { z } from "zod"
import { Category, Category_zod } from "./data/data.types"
import { publicProcedure, router } from "./trpc.utils"
import data from "./data/data.json"

function asWithCategories<TInput>(input: TInput) {
  return input as typeof input & { categories: Category[] }
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
        .map(p => asWithCategories(p.title ? p : { ...p, title: `${p.firstName} ${p.lastName}` }))
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
      return asWithCategories(
        post.title ? post : { ...post, title: `${post.firstName} ${post.lastName}` }
      )
    }),
})

export default Post_api
