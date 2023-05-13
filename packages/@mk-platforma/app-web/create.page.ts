import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { getServerSession } from "next-auth/next"
import { auth_options } from "./pages/api/auth/[...nextauth]"

export function create_getServerSideProps<T>(
  wrapped: (ctx: GetServerSidePropsContext) => Promise<GetServerSidePropsResult<T>>
) {
  return async function (ctx: GetServerSidePropsContext) {
    const session = await getServerSession(ctx.req, ctx.res, auth_options)
    const res: Partial<GetServerSidePropsResult<unknown>> = session
      ? {}
      : {
          redirect: {
            destination: "http://localhost:3000/api/auth/signin",
            permanent: false,
          },
        }
    const res_wrapped = await wrapped(ctx)
    return {
      ...res,
      ...res_wrapped,
    }
  }
}
