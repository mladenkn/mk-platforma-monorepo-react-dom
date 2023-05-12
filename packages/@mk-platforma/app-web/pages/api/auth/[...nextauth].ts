import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import db from "../../../prisma/instance"

export const authOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(db),
  providers: [
    EmailProvider({
      server:
        "smtp://apikey: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@smtp.sendgrid.net",
      from: "mladen.knezovic.1993@gmail.com",
    }),
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)
