import { initTRPC } from "@trpc/server"
import data from './data/data.json'
import sections from "./data/data.sections"
import { z } from "zod"
import superjson from 'superjson'


const t = initTRPC.create({
  transformer: superjson,
})

const router = t.router
const publicProcedure = t.procedure

export const appRouter = router({
  posts: publicProcedure.query(() => data.allPosts),

  post_single: publicProcedure
    .input(z.object({
      id: z.number()
    }))
    .query(({ input }) => data.allPosts.find(post => post.id === input.id)),

  sections: publicProcedure.query(() => sections),
})

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter
