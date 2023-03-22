import { initTRPC } from "@trpc/server"

const t = initTRPC.create()

const router = t.router
const publicProcedure = t.procedure

export const appRouter = router({
  hello: publicProcedure.query(() => "hello from trpc first query!"),
})

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter
