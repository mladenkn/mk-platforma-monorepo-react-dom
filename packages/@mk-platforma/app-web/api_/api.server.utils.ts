import { TRPCError, initTRPC } from "@trpc/server"
import superjson from "superjson"
import db, { DbClient } from "~/prisma/instance"
import { user_ss_get } from "~/pages/api/auth/[...nextauth]"
import { IncomingMessage, ServerResponse } from "http"
import { NextApiRequestCookies } from "next/dist/server/api-utils"
import { create_getCookie_ss } from "~/cookies"
import { asNonNil } from "~/../../@mk-libs/common/common"
import "@mk-libs/common/server-only"
import { NextApiRequest, NextApiResponse } from "next"

export async function createContext(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<Api_context> {
  const user = await user_ss_get(req, res)
  return {
    db,
    user: user && {
      id: user.id,
      canMutate: user.canMutate,
      name: user.name,
    },
    getCookie: create_getCookie_ss(req.headers.cookie ?? ""),
  }
}

export type Api_context = {
  db: DbClient
  user?: {
    id: number
    canMutate: boolean
    name?: string | null
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

export function authorizedRoute(
  check: (user: NonNullable<Api_context["user"]>) => boolean = () => true,
) {
  return t.procedure.use(
    t.middleware(opts => {
      const { ctx } = opts
      const isAuthorized = ctx.user && check(ctx.user)
      if (!isAuthorized) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User not authorized in authorizedRoute.",
          cause: "User not authorized in authorizedRoute.",
        })
      }
      return opts.next({
        ctx: {
          ...ctx,
          user: asNonNil(ctx.user),
        },
      })
    }),
  )
}
