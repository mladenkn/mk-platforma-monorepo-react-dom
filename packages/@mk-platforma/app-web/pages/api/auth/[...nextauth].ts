import NextAuth, { getServerSession } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import db from "../../../prisma/instance"
import { eva } from "@mk-libs/common/common"
import { AdapterUser } from "next-auth/adapters"
import { avatarStyles } from "../../../api/User.api"
import { getRandomElement } from "@mk-libs/common/array"
import type { NextAuthOptions } from "next-auth"
import { IncomingMessage, ServerResponse } from "http"
import { NextApiRequestCookies } from "next/dist/server/api-utils"

const auth_options = {
  providers: [
    EmailProvider({
      server:
        "smtp://apikey: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@smtp.sendgrid.net",
      from: "zabrata.app.login@gmail.com",
    }),
  ],
  adapter: eva(() => {
    const adapter = PrismaAdapter(db)
    const createUser_wrapped = adapter.createUser
    adapter.createUser = function (data: Omit<AdapterUser, "id">) {
      const data_updated = { ...data, avatarStyle: getRandomElement(avatarStyles) }
      return createUser_wrapped(data_updated)
    }
    return adapter
  }),
} satisfies NextAuthOptions

export function session_ss_get(
  req: IncomingMessage & {
    cookies: NextApiRequestCookies
  },
  res: ServerResponse
) {
  return getServerSession(req, res, auth_options)
}

export default NextAuth(auth_options)
