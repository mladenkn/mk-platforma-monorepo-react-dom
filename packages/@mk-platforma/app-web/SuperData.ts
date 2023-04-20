import { z } from "zod"
import { DataSelectors, Prisma_paramsMerger_create } from "./SuperData.generated"
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
      firstOutput: TFirstOutput,
      dataSelectors: DataSelectors
    ) => Promise<TSecondOutput>
  ) {
    return publicProcedure.input(input_zod).query(async ({ ctx, input }) => {
      const paramMerger = Prisma_paramsMerger_create(ctx)
      const mapped1 = await mapFirst(ctx, input as any)
      const mapped2 = await mapSecond(ctx, input as any, mapped1, paramMerger)
      return mapped2
    })
  }
}
