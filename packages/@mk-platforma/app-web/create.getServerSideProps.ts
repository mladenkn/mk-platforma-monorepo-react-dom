import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { session_ss_get_mock } from "~/pages/api/auth/[...nextauth]"
import { Session } from "next-auth"
import { z } from "zod"
import { P, match } from "ts-pattern"

type Options<TInput> = {
  queryParams: z.ZodType<TInput>
}

type Wrapped_noParams<TOutput> = (
  ctx: GetServerSidePropsContext,
  session: Session
) => Promise<GetServerSidePropsResult<TOutput>>

type Wrapped_withParams<TInput, TOutput> = (
  ctx: GetServerSidePropsContext,
  session: Session,
  params: TInput
) => Promise<GetServerSidePropsResult<TOutput>>

type FullParams<TInput, TOutput> =
  | [Wrapped_noParams<TOutput>]
  | [Options<TInput>, Wrapped_withParams<TInput, TOutput>]

export function create_getServerSideProps<TOutput, TInput = undefined>(
  ...args: FullParams<TOutput, TInput>
) {
  return async function (ctx: GetServerSidePropsContext) {
    return match(args)
      .with([P_object, P_function], async ([options, wrapped]) => {
        const session = await session_ss_get_mock(ctx.req, ctx.res)
        const queryParams_parsed = options.queryParams.safeParse(ctx.query)
        if (!queryParams_parsed.success) {
          ctx.res.statusCode = 400
          ctx.res.end()
        }
        if (session) return await wrapped(ctx, session, (queryParams_parsed as any).data)
        else
          return {
            redirect: {
              destination: "/api/auth/signin",
              permanent: false,
            },
          }
      })
      .with([P_function], async ([wrapped]) => {
        const session = await session_ss_get_mock(ctx.req, ctx.res)
        if (session) return await wrapped(ctx, session)
        else
          return {
            redirect: {
              destination: "/api/auth/signin",
              permanent: false,
            },
          }
      })
      .run()
  }
}

const P_function = P.when(it => typeof it === "function")
const P_object = P.when(it => typeof it === "object")
