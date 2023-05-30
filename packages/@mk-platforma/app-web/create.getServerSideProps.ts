import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { session_ss_get_mock } from "~/pages/api/auth/[...nextauth]"
import { Session } from "next-auth"
import { z } from "zod"
import { P, match } from "ts-pattern"
import { asNonNil, tryParseInt } from "@mk-libs/common/common"

type Options<TInput> = {
  queryParams?: z.ZodType<TInput>
}

type Returned<TOutput> = Promise<GetServerSidePropsResult<TOutput>>

type Wrapped_noParams<TOutput> = (
  ctx: GetServerSidePropsContext,
  session: Session
) => Returned<TOutput>

type Wrapped_withParams<TInput, TOutput> = (
  ctx: GetServerSidePropsContext,
  session: Session,
  params: TInput
) => Returned<TOutput>

type Params_union<TInput, TOutput> =
  | [Wrapped_noParams<TOutput>]
  | [Options<TInput>, Wrapped_withParams<TInput, TOutput>]

export function create_getServerSideProps<TOutput, TInput = undefined>(
  ...args: Params_union<TOutput, TInput>
) {
  return async function (ctx: GetServerSidePropsContext) {
    return match(args)
      .with([{ queryParams: P_object }, P_function], async ([options, wrapped]) => {
        const session = await session_ss_get_mock(ctx.req, ctx.res)

        const ctx_query_mapped = Object.fromEntries(
          Object.entries(ctx.query).map(([key, value]) => {
            if (typeof value === "string") {
              const parsed = tryParseInt(value)
              if (parsed.number) return [key, parsed.number]
            }
            return [key, value]
          })
        )
        const queryParams_parsed = options.queryParams?.safeParse(ctx_query_mapped) ?? {
          success: true,
          data: {},
        }

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
