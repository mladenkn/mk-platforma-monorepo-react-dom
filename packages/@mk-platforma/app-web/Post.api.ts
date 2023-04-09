import { z } from "zod"
import { Category_zod, Post_base } from "./data/data.types"
import { publicProcedure, router } from "./trpc.utils"
import data from "./data/data.json"

const Post_api = router({
  many: publicProcedure
    .input(
      z.object({
        categories: z.array(Category_zod).optional(),
      })
    )
    .query(
      ({ input }) =>
        data.allPosts
          .map(p => (p.title ? p : { ...p, title: `${p.firstName} ${p.lastName}` }))
          .filter(post =>
            input.categories
              ? input.categories.every(requiredCategory =>
                  post.categories.includes(requiredCategory)
                )
              : true
          ) as Post_base[]
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
      return (
        post.title ? post : { ...post, title: `${post.firstName} ${post.lastName}` }
      ) as Post_base
    }),
})

export default Post_api
