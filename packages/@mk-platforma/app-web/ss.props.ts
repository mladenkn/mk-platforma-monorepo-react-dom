import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { z } from "zod"
import { asNonNil, tryParseInt } from "@mk-libs/common/common"
import { Api_ss, Api_ss_type } from "./api.trpc/api.root"
import { Api_context, createContext } from "./api.trpc/api.server.utils"
import { P, match } from "ts-pattern"
import { omit } from "lodash"
// TODO: import "@mk-libs/common/server-only"

type Options<TInput> = {
  queryParams?: z.ZodType<TInput>
  authenticate?: boolean
  authorize?: (c: Api_context & { api: Api_ss_type }) => boolean
}

export function ss_props_get_create<TOutput, TInput = undefined>(
  options: Options<TInput>,
  wrapped?: (
    ctx: Api_context & { api: Api_ss_type },
    params: TInput,
  ) => Promise<GetServerSidePropsResult<TOutput>>,
) {
  return async function (_ctx: Api_context & { query?: Record<string, unknown> }) {
    const api = Api_ss(_ctx)
    const ctx = { ..._ctx, api }

    const { query } = ctx
    const ctx_query_mapped = Object.fromEntries(
      Object.entries(query || {}).map(([key, value]) => {
        if (typeof value === "string") {
          const parsed = tryParseInt(value)
          if (parsed.number) return [key, parsed.number]
        }
        return [key, value]
      }),
    )
    const queryParams_parsed = options.queryParams?.safeParse(ctx_query_mapped) ?? {
      success: true,
      data: {},
    }

    if (!queryParams_parsed.success) {
      return { statusCode: 400 }
    }

    const options_mapped = {
      authenticate: options.authenticate ?? false,
      authorize: options.authorize ?? (() => true),
    }

    if (options_mapped.authenticate && !ctx.user) {
      return {
        redirect: {
          destination: `/api/auth/signin`,
          permanent: false,
        },
      }
    } else if (!options_mapped.authorize(ctx)) {
      return { statusCode: 404 }
    } else {
      return wrapped ? await wrapped(ctx, (queryParams_parsed as any).data) : { props: {} }
    }
  }
}

export function ss_props_get_create_next<TOutput, TInput = undefined>(
  getInitialProps: Awaited<ReturnType<typeof ss_props_get_create<TOutput, TInput>>>,
) {
  return async function (nextContext: Pick<GetServerSidePropsContext, "req" | "res" | "query">) {
    const ctx = await createContext(nextContext.req as any, nextContext.res as any)
    const initialPropsContext = await getInitialProps({ ...ctx, query: nextContext.query })
    return match(initialPropsContext)
      .with({ statusCode: P.when(code => code && code >= 400 && code < 600) }, ({ statusCode }) => {
        nextContext.res.statusCode = asNonNil(statusCode)
        nextContext.res.end()
        return omit(initialPropsContext, "statusCode")
      })
      .otherwise(i => i)
  }
}

export default function ss_props_get_create_full<TOutput, TInput = undefined>(
  options: Options<TInput>,
  wrapped?: (
    ctx: Api_context & { api: Api_ss_type },
    params: TInput,
  ) => Promise<GetServerSidePropsResult<TOutput>>,
) {
  const get_ss_props = ss_props_get_create(options, wrapped)
  return ss_props_get_create_next(get_ss_props)
}
