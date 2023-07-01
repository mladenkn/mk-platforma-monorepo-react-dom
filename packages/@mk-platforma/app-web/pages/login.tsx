import { GetServerSidePropsContext } from "next"
import { signIn, useSession } from "next-auth/react"
import { createContext } from "~/api_/api.server.utils"

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  const ctx = await createContext(req, res)
  if (ctx.user)
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    }
}

export default function Login() {
  const session = useSession()
  if (session.status !== "loading" && !session.data?.user) signIn()
  else throw new Error("Expected user to be unauthenticated")
}
