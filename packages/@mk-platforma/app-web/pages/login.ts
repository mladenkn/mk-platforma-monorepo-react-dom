import { GetServerSidePropsContext } from "next"
import { getCsrfToken } from "next-auth/react"
import Login from "~/domain/Login"

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const csrfToken = await getCsrfToken(context)
  return {
    props: { csrfToken },
  }
}

export default Login
