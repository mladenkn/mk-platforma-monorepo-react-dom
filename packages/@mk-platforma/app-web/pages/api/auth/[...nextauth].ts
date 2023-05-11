import { asNonNil } from "@mk-libs/common/common"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: asNonNil(process.env.GOOGLE_CLIENT_ID),
      clientSecret: asNonNil(process.env.GOOGLE_CLIENT_SECRET),
    }),
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)
