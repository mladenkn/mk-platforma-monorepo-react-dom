import { initTRPC } from "@trpc/server"
import data from "./data/data.json"
import { z } from "zod"
import superjson from "superjson"
import { Category_zod, Post_base } from "./data/data.types"

const t = initTRPC.create({
  transformer: superjson,
})

const router = t.router
const publicProcedure = t.procedure

export const appRouter = router({
  posts: publicProcedure
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

  post_single: publicProcedure
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

export const api_ss = appRouter.createCaller({})

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter
