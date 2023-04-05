import { z } from "zod"
import { Category_zod, Post_base } from "./data/data.types"
import { publicProcedure, router } from "./trpc.router"
import data from "./data/data.json"

const Posts_api = router({
  get_many: publicProcedure
    .input(
      z.object({
        categories: z.array(Category_zod).optional(),
      })
    )
    .query(
      ({ input }) =>
        data.allPosts
          .map(p => (p.label ? p : { ...p, label: `${p.firstName} ${p.lastName}` }))
          .filter(post =>
            input.categories
              ? input.categories.every(tabCat => post.categories.includes(tabCat))
              : true
          ) as Post_base[]
    ),

  get_single: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(({ input }) => {
      const post = data.allPosts.find(post => post.id === input.id)
      if (!post) return post
      return (
        post.label ? post : { ...post, label: `${post.firstName} ${post.lastName}` }
      ) as Post_base
    }),
})

export default Posts_api
