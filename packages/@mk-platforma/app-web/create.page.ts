import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { session_ss_get } from "./pages/api/auth/[...nextauth]"

export function create_getServerSideProps<T>(
  wrapped: (ctx: GetServerSidePropsContext) => Promise<GetServerSidePropsResult<T>>
) {
  return async function (ctx: GetServerSidePropsContext) {
    const session = await session_ss_get(ctx.req, ctx.res)
    const res: Partial<GetServerSidePropsResult<unknown>> = session
      ? {}
      : {
          redirect: {
            destination: "/api/auth/signin",
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
