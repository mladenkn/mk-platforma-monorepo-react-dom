import { z } from "zod"
import { Api_context } from "./trpc.server"
import { publicProcedure } from "./trpc.server.utils"

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
      const mapped2 = await mapSecond(ctx, input as any, mapped1)
      return mapped2
    })
  }
}
