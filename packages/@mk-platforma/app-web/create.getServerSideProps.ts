import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { session_ss_get_mock } from "~/pages/api/auth/[...nextauth]"
import { Session } from "next-auth"
import { z } from "zod"
import { P, match } from "ts-pattern"

type Options<TInput> = {
  queryParams: z.ZodType<TInput>
}

export function create_getServerSideProps<TOutput, TInput = undefined>(
  options: Options<TInput>,
  wrapped: (
    ctx: GetServerSidePropsContext,
    session: Session,
    params: TInput
  ) => Promise<GetServerSidePropsResult<TOutput>>
): any

export function create_getServerSideProps<TOutput, TInput = undefined>(
  wrapped: (
    ctx: GetServerSidePropsContext,
    session: Session
  ) => Promise<GetServerSidePropsResult<TOutput>>
): any

export function create_getServerSideProps<TOutput, TInput = undefined>(...args: any[]) {
  return async function (ctx: GetServerSidePropsContext) {
    return match(args).with([P_object, P_function], async ([options, wrapped]) => {
      const session = await session_ss_get_mock(ctx.req, ctx.res)
      if (session) return await (wrapped as any)(ctx, session)
      else
        return {
          redirect: {
            destination: "/api/auth/signin",
            permanent: false,
          },
        }
    })
  }
}

const P_function = P.when(it => typeof it === "function")
const P_object = P.when(it => typeof it === "object")
