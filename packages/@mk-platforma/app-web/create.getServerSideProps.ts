import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { session_ss_get_mock } from "~/pages/api/auth/[...nextauth]"
import { z } from "zod"
import { P, match } from "ts-pattern"
import { tryParseInt } from "@mk-libs/common/common"
import { Api_ss, Api_ss_type } from "./api_/api.root"
import { Api_context, createContext } from "./api_/api.server.utils"

type Options<TInput> = {
  queryParams?: z.ZodType<TInput>
  requireAuth?: boolean
}

type Returned<TOutput> = Promise<GetServerSidePropsResult<TOutput>>

type Wrapped_withParams<TInput, TOutput> = (
  ctx: Api_context,
  api: Api_ss_type,
  params: TInput,
  nextContext: GetServerSidePropsContext
) => Returned<TOutput>

type Wrapped_noParams<TOutput> = (
  ctx: Api_context,
  api: Api_ss_type,
  nextContext: GetServerSidePropsContext
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
        if (session || !options.requireAuth) {
          const ctx_ = await createContext(ctx.req, ctx.res)
          const api = Api_ss(ctx_)
          return await wrapped(ctx_, api, (queryParams_parsed as any).data, ctx)
        } else
          return {
            redirect: {
              destination: "/api/auth/signin",
              permanent: false,
            },
          }
      })
      .with([P_function], async ([wrapped]) => {
        const ctx_ = await createContext(ctx.req, ctx.res)
        const api = Api_ss(ctx_)
        return await wrapped(ctx_, api, ctx)
      })
      .run()
  }
}

const P_function = P.when(it => typeof it === "function")
const P_object = P.when(it => typeof it === "object")
