import { z } from "zod"
import { Api_context } from "../trpc.server"
import { publicProcedure } from "../trpc.server.utils"
import { Post_queryChunks_search } from "./Post.api"

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

const input_zod = z.object({
  categories: z.array(z.number()).optional(),
  search: z.string().optional(),
})

export const Post_api_abstract = {
  list: SuperData_query(input_zod, async ({ db }, input) => {
    return {
      where: {
        categories: input.categories?.length
          ? {
              some: {
                OR: [{ id: input.categories[0] }, { parent_id: input.categories[0] }],
              },
            }
          : undefined,
        ...(input?.search ? Post_queryChunks_search(input.search) : {}),
      },
    }
  }),
}

// const Post_api_ss = Post_api.createCaller({ db: prisma_dbInstance, userId: 1 })

// const posts = Post_api_ss.post.list({})
