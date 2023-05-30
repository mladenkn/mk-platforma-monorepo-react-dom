import { initTRPC } from "@trpc/server"
import superjson from "superjson"
import db from "~/prisma/instance"
import { session_ss_get_mock } from "~/pages/api/auth/[...nextauth]"
import { IncomingMessage, ServerResponse } from "http"
import { NextApiRequestCookies } from "next/dist/server/api-utils"
import { Session } from "next-auth"
import { PrismaClient } from "@prisma/client"

export async function createContex(
  req: IncomingMessage & {
    cookies: NextApiRequestCookies
  },
  res: ServerResponse
): Promise<Api_context> {
  const session = await session_ss_get_mock(req, res)
  return {
    db,
    session,
    user: {
      id: session.user!.id,
      canMutate: session.user!.canMutate,
    },
  }
}

export type Api_context = {
  db: PrismaClient
  session?: Session | null | undefined
  user: {
    id: number
    canMutate: boolean
  }
}

const t = initTRPC.context<Api_context>().create({
  transformer: superjson,
})

export const router = t.router
export const publicProcedure = t.procedure
