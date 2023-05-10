import { initTRPC } from "@trpc/server"
import superjson from "superjson"
import db from "./prisma/instance"

export const createContext = async () => {
  return {
    db,
    userId: 1,
  }
}

const t = initTRPC.context<typeof createContext>().create({
  transformer: superjson,
})

export const router = t.router
export const publicProcedure = t.procedure
