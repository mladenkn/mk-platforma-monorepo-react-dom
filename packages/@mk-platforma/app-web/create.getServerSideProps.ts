import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { session_ss_get } from "~/pages/api/auth/[...nextauth]"
import { Session } from "next-auth"
import { z } from "zod"

type Options<TInput> = {
  params?: z.ZodType<TInput>
}

export function create_getServerSideProps<TOutput, TInput = undefined>(
  wrapped: (
    ctx: GetServerSidePropsContext,
    session: Session,
    params?: TInput
  ) => Promise<GetServerSidePropsResult<TOutput>>,
  options?: Options<TInput>
) {
  return async function (ctx: GetServerSidePropsContext) {
    const session = await session_ss_get(ctx.req, ctx.res)
    if (session) return await wrapped(ctx, session)
    else
      return {
        redirect: {
          destination: "/api/auth/signin",
          permanent: false,
        },
      }
  }
}
