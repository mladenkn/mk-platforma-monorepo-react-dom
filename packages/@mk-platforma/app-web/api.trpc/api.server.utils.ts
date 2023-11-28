import { TRPCError, initTRPC } from "@trpc/server"
import superjson from "superjson"
import { create_getCookie_ss } from "~/cookies"
import { asNonNil } from "~/../../@mk-libs/common/common"
import "@mk-libs/common/server-only"
import { NextApiRequest, NextApiResponse } from "next"
import drizzle_connect, { Drizzle_instance } from "~/drizzle/drizzle.instance"

export async function createContext(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<Api_context> {
  return {
    db: drizzle_connect(),
    user: undefined,
    getCookie: create_getCookie_ss(req.headers.cookie ?? ""),
  }
}

export type Api_context = {
  db: Drizzle_instance
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
