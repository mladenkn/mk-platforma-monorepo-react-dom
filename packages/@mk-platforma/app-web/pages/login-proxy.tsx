import { GetServerSidePropsContext } from "next"
import { user_ss_get } from "./api/auth/[...nextauth]"
import { signIn } from "next-auth/react"

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  const user = await user_ss_get(req as any, res as any)
  if (user) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    }
  } else return { props: {} }
}

export default function Login() {
  signIn()
}
