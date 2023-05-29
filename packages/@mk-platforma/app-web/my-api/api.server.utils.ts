import { initTRPC } from "@trpc/server"
import superjson from "superjson"
import db from "~/prisma/instance"
import { user_id_ss_get } from "~/pages/api/auth/[...nextauth]"
import { IncomingMessage, ServerResponse } from "http"
import { NextApiRequestCookies } from "next/dist/server/api-utils"

export const createContext = async (
  req: IncomingMessage & {
    cookies: NextApiRequestCookies
  },
  res: ServerResponse
) => {
  return {
    db,
    user_id: await user_id_ss_get(req, res),
  }
}

const t = initTRPC.context<typeof createContext>().create({
  transformer: superjson,
})

export const router = t.router
export const publicProcedure = t.procedure
