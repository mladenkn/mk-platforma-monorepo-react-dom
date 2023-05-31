import NextAuth, { DefaultSession, getServerSession } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import db from "../../../prisma/instance"
import { asNonNil, eva } from "@mk-libs/common/common"
import { AdapterUser } from "next-auth/adapters"
import { getRandomElement } from "@mk-libs/common/array"
import type { NextAuthOptions } from "next-auth"
import { IncomingMessage, ServerResponse } from "http"
import { NextApiRequestCookies } from "next/dist/server/api-utils"
import { Prisma } from "@prisma/client"
import { P, match } from "ts-pattern"
import { avatarStyles } from "~/domain/user/User.common"

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
  },
} satisfies NextAuthOptions

declare module "next-auth/adapters" {
  interface AdapterUser {
    avatarStyle: Prisma.JsonValue
    canMutate: boolean
  }
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: DefaultSession["user"] & {
      id: number
      avatarStyle: Prisma.JsonValue
      canMutate: boolean
    }
  }
}

export function session_ss_get(
  req: IncomingMessage & {
    cookies: NextApiRequestCookies
  },
  res: ServerResponse
) {
  return getServerSession(req, res, auth_options)
}

export async function session_ss_get_mock(
  req: IncomingMessage & {
    cookies: NextApiRequestCookies
  },
  res: ServerResponse
) {
  const session = await getServerSession(req, res, auth_options)
  if (session?.user) return session
  else {
    const user = await db.user.findUnique({ where: { name: "Mladen" } })
    if (user)
      return {
        ...session,
        expires: session?.expires ?? "default expires haha",
        user,
      }
    else {
      const firstUser = await db.user.findFirst({})
      return {
        ...session,
        expires: session?.expires ?? "default expires haha",
        user: asNonNil(firstUser),
      }
    }
  }
}

// fix: only session user
export async function user_ss_get(
  req: IncomingMessage & {
    cookies: NextApiRequestCookies
  },
  res: ServerResponse
) {
  return (await session_ss_get_mock(req, res)).user
}

export default NextAuth(auth_options)
