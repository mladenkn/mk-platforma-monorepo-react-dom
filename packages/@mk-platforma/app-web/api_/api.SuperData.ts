import { z } from "zod"
import { Api_context, publicProcedure } from "./api.server.utils"
import "@mk-libs/common/server-only"

export function SuperData_mapper<TInput, TOutput>(
  input_zod: z.ZodType<TInput>,
  mapFirst: (ctx: Api_context, input: TInput, output1?: unknown) => Promise<TOutput>,
) {
  const f = (ctx: Api_context, input: TInput, output1?: unknown) => mapFirst(ctx, input, output1)
  f.input_zod = input_zod
  return f
}

export function SuperData_query<TInput1, TOutput1, TOutput2>(
  map1: ((ctx: Api_context, i: TInput1) => Promise<TOutput1>) & { input_zod: z.ZodType<TInput1> },
  map2: (ctx: Api_context, output1: TOutput1, i: TInput1) => Promise<TOutput2>,
) {
  return publicProcedure.input(map1.input_zod).query(async ({ ctx, input }) => {
    const output1 = await map1(ctx, input as any)
    const output2 = await map2(ctx, output1, input as any)
    return output2
  })
}

export function SuperData_query2<TInput1, TOutput1, TOutput2, TInput2>(
  map1: ((ctx: Api_context, i: TInput1) => Promise<TOutput1>) & { input_zod: z.ZodType<TInput1> },
  input_zod: z.ZodType<TInput2>,
  map2: (ctx: Api_context, output1: TOutput1, i: TInput1 & TInput2) => Promise<TOutput2>,
) {
  const input = map1.input_zod.and(input_zod)
  return publicProcedure.input(input).query(async ({ ctx, input }) => {
    const output1 = await map1(ctx, input as any)
    const output2 = await map2(ctx, output1, input as any)
    return output2
  })
}
