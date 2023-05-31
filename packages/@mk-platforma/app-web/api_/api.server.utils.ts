import { TRPCError, initTRPC } from "@trpc/server"
import superjson from "superjson"
import db from "~/prisma/instance"
import { user_ss_get } from "~/pages/api/auth/[...nextauth]"
import { IncomingMessage, ServerResponse } from "http"
import { NextApiRequestCookies } from "next/dist/server/api-utils"
import { PrismaClient } from "@prisma/client"
import { create_getCookie_ss } from "~/cookies"

export async function createContext(
  req: IncomingMessage & {
    cookies: NextApiRequestCookies
  },
  res: ServerResponse
): Promise<Api_context> {
  const user = await user_ss_get(req, res)
  return {
    db,
    user: user && {
      id: user.id,
      canMutate: user.canMutate,
    },
    getCookie: create_getCookie_ss(req.headers.cookie ?? ""),
  }
}

export type Api_context = {
  db: PrismaClient
  user?: {
    id: number
    canMutate: boolean
  }
  getCookie: ReturnType<typeof create_getCookie_ss>
}

const t = initTRPC.context<Api_context>().create({
  transformer: superjson,
})

const isAuthed = t.middleware(opts => {
  const { ctx } = opts
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }
  return opts.next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  })
})

export const router = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(isAuthed)
