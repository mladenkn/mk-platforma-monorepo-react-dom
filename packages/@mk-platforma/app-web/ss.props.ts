import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { z } from "zod"
import { tryParseInt } from "@mk-libs/common/common"
import { Api_ss, Api_ss_type } from "./api_/api.root"
import { Api_context, createContext } from "./api_/api.server.utils"

type Options<TInput> = {
  queryParams?: z.ZodType<TInput>
  authenticate?: boolean
  authorize?: (c: Api_context & { api: Api_ss_type }) => boolean
}

export default function create_get_ss_props<TOutput, TInput = undefined>(
  options: Options<TInput>,
  wrapped?: (
    ctx: Api_context & { api: Api_ss_type },
    params: TInput,
    nextContext: GetServerSidePropsContext
  ) => Promise<GetServerSidePropsResult<TOutput>>
) {
  return async function (nextContext: GetServerSidePropsContext) {
    const _ctx = await createContext(nextContext.req, nextContext.res)
    const api = Api_ss(_ctx)
    const ctx = { ..._ctx, api }

    const ctx_query_mapped = Object.fromEntries(
      Object.entries(nextContext.query).map(([key, value]) => {
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
      nextContext.res.statusCode = 400
      nextContext.res.end()
    }

    const options_mapped = {
      authenticate: options.authenticate ?? false,
      authorize: options.authorize ?? (() => true),
    }

    if (options_mapped.authenticate && !ctx.user) {
      return {
        redirect: {
          destination: `api/auth/signin`,
          permanent: false,
        },
      }
    } else if (!options_mapped.authorize(ctx)) {
      nextContext.res.statusCode = 404
      nextContext.res.end()
    } else {
      return wrapped
        ? await wrapped(ctx, (queryParams_parsed as any).data, nextContext)
        : { props: {} }
    }
  }
}
