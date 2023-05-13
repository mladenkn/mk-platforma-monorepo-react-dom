import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import db from "../../../prisma/instance"
import { eva } from "@mk-libs/common/common"
import { AdapterUser } from "next-auth/adapters"
import { avatarStyles } from "../../../api/User.api"
import { getRandomElement } from "@mk-libs/common/array"

export default NextAuth({
  adapter: eva(() => {
    const adapter = PrismaAdapter(db)
    const createUser_wrapped = adapter.createUser
    adapter.createUser = function (data: Omit<AdapterUser, "id">) {
      const data_updated = { ...data, avatarStyle: getRandomElement(avatarStyles) }
      return createUser_wrapped(data_updated)
    }
    return adapter
  }),
  providers: [
    EmailProvider({
      server:
        "smtp://apikey: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@smtp.sendgrid.net",
      from: "zabrata.app.login@gmail.com",
    }),
  ],
})
