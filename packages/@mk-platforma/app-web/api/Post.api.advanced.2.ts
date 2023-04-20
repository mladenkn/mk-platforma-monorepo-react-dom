import { z } from "zod"
import prisma_dbInstance from "../prisma/instance"
import { Api_context } from "../trpc.server"
import { publicProcedure, router } from "../trpc.server.utils"

export function SuperData_query<TInput, TFirstOutput>(
  input_zod: z.ZodType<TInput>,
  mapFirst: (ctx: Api_context, input: TInput) => Promise<TFirstOutput>
) {
  return function <TSecondOutput>(
    mapSecond: (
      ctx: Api_context,
      input: TInput,
      firstOutput: TFirstOutput
    ) => Promise<TSecondOutput>
  ) {
    return publicProcedure.input(input_zod).query(async ({ ctx, input }) => {
      const mapped1 = await mapFirst(ctx, input as any)
      const mapped2 = mapSecond(ctx, input as any, mapped1)
      return mapped2 as TSecondOutput
    })
  }
}

const Post_api = router({
  post: router({
    list: SuperData_query(z.object({}), async (ctx, input) => {
      return "ovo je od prvoga" as "ovo je od prvoga"
    })(async (ctx, input, firstMapped) => "ovo je od drugoga" as "ovo je od drugoga"),
  }),
})

const Post_api_ss = Post_api.createCaller({ db: prisma_dbInstance, userId: 1 })

const posts = Post_api_ss.post.list({})
