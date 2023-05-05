import { z } from "zod"
import { Api_context } from "./trpc.server"
import { publicProcedure } from "./trpc.server.utils"

export function SuperData_query<TInput, TFirstOutput>(
  input_zod: z.ZodType<TInput>,
  mapFirst: (ctx: Api_context, input: TInput) => Promise<TFirstOutput>
) {
  return function <TSecondOutput>(
    mapSecond: (
      ctx: Api_context & {
        input: TInput
        firstMap: TFirstOutput
      }
    ) => Promise<TSecondOutput>
  ) {
    return publicProcedure.input(input_zod).query(async ({ ctx, input }) => {
      const mapped1 = await mapFirst(ctx, input as any)
      const mapped2 = await mapSecond({ ...ctx, firstMap: mapped1, input: input as any })
      return mapped2
    })
  }
}

export function SuperData_mapper<TInput, TOutput>(
  input_zod: z.ZodType<TInput>,
  mapFirst: (ctx: Api_context, input: TInput, output1?: unknown) => Promise<TOutput>
) {
  const f = (ctx: Api_context, input: TInput, output1?: unknown) => mapFirst(ctx, input, output1)
  f.input_zod = input_zod
  return f
}

export function SuperData_finalQuery<TInput1, TOutput1, TOutput2, TInput2>(
  map1: ((ctx: Api_context, i: TInput1) => Promise<TOutput1>) & { input_zod: z.ZodType<TInput1> },
  input_zod: z.ZodType<TInput2>,
  map2: (ctx: Api_context, output1: TOutput1, i: TInput2) => Promise<TOutput2>
) {
  const input = map1.input_zod.and(input_zod)
  return publicProcedure.input(input).query(async ({ ctx, input }) => {
    const output1 = await map1(ctx, input as any)
    const output2 = await map2(ctx, output1, input as any)
    return output2
  })
}
