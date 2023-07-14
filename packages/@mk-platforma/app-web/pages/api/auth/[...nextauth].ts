import NextAuth, { DefaultSession, getServerSession } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import db from "../../../prisma/instance"
import { asNonNil, eva } from "@mk-libs/common/common"
import { AdapterUser } from "next-auth/adapters"
import { getRandomElement } from "@mk-libs/common/array"
import type { NextAuthOptions } from "next-auth"
import { Prisma } from "@prisma/client"
import { P, match } from "ts-pattern"
import { avatarStyles } from "~/domain/user/User.common"
import env from "~/env.mjs"
import { NextApiRequest, NextApiResponse } from "next"
import { PASSWORD } from "~/domain/Auth.api"

// type Request = IncomingMessage & {
//   cookies: NextApiRequestCookies
// }
type Request = NextApiRequest

const auth_options = (req: Request, res: NextApiResponse) =>
  ({
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
        const data_updated = {
          ...data,
          avatarStyle: getRandomElement(avatarStyles),
          canMutate: true,
        }
        return createUser_wrapped(data_updated)
      }
      return adapter
    }),
    callbacks: {
      session({ session, user }) {
        if (session.user) {
          session.user.avatarStyle = user.avatarStyle
          session.user.canMutate = user.canMutate
          session.user.id = match(user.id as string | number)
            .with(P.string, i => parseInt(i))
            .otherwise(i => i)
        }
        return session
      },
      signIn({ email }) {
        if (email?.verificationRequest === true) {
          return req.body.password === PASSWORD
        }
        return true
      },
    },
    pages: {
      newUser: "/profile/edit",
      signIn: "/login",
    },
    session: {
      maxAge: 2592000 * 24, // 30 dana * 24
    },
  } satisfies NextAuthOptions)

declare module "next-auth/adapters" {
  interface AdapterUser {
    avatarStyle: Prisma.JsonValue
    canMutate: boolean
    name?: string
  }
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: DefaultSession["user"] & {
      id: number
      avatarStyle: Prisma.JsonValue
      canMutate: boolean
      name?: string
    }
  }
}

function session_ss_get(req: Request, res: NextApiResponse) {
  return getServerSession(req, res, auth_options(req, res))
}

export async function user_ss_get(req: Request, res: NextApiResponse) {
  if (env.NEXT_PUBLIC_MOCK_USER_ID) {
    return asNonNil(
      await db.user.findUnique({ where: { id: parseInt(env.NEXT_PUBLIC_MOCK_USER_ID) } })
    )
  }
  return (await session_ss_get(req, res))?.user
}

export default (req: Request, res: NextApiResponse) => NextAuth(req, res, auth_options(req, res))
