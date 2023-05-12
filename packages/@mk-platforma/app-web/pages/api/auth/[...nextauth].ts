import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    EmailProvider({
      server:
        "smtp://AKIAYF5HYUQSV2VCUGEK:BITIEuaABEn0B4N8MpNva0fkXZLXMLXQscxGIUn+Bt+t@email-smtp.eu-north-1.amazonaws.com",
      from: "mladen.knezovic.1993@gmail.com",
    }),
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)
