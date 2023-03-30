import { initTRPC } from "@trpc/server"
import data from './data/data.json'
import sections from "./data/data.sections"
import { z } from "zod"
import superjson from 'superjson'
import { Category_zod } from "./data/data.types"


const t = initTRPC.create({
  transformer: superjson,
})

const router = t.router
const publicProcedure = t.procedure

export const appRouter = router({
  posts: publicProcedure
    .input(z.object({
      categories: z.array(Category_zod).optional(),
    }))
    .query(({ input }) =>
      data.allPosts
        .map(p => p.label ? p : ({ ...p, label: `${p.firstName} ${p.lastName}` }))
        .filter(post =>
          input.categories ? 
            input.categories.every(tabCat => post.categories.includes(tabCat)) :
            true
        )
    ),

  post_single: publicProcedure
    .input(z.object({
      id: z.number()
    }))
    .query(({ input }) => {
      const post = data.allPosts.find(post => post.id === input.id)
      if(!post)
        return post
      return post.label ? post : { ...post, label: `${post.firstName} ${post.lastName}` }
    }),

  sections: publicProcedure.query(() => sections),
})

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter
