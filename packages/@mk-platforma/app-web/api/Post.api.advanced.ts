import { z } from "zod"
import { publicProcedure, router } from "../trpc.utils"
import { Post_single_details_PostSelect } from "../client/Post.single.details"
import { Prisma, PrismaClient } from "@prisma/client"
import a from "../pages/api/trpc/[trpc]"

const db = new PrismaClient()

function createMethod(inner: any) {
  return async <TOutput>(select: any, map?: any): Promise<TOutput> => {
    const data = await inner(select)
    return map ? map(data) : data
  }
}

const Prisma_api = {
  post: {
    findUnique:
      <TInput, TOutput>({
        input: zodInput,
        resolve,
      }: {
        input: z.ZodType<TInput>
        resolve: (ctx: any, input: TInput, moreArgs: Prisma.PostFindUniqueArgs) => TOutput
      }) =>
      <TMoreArgs extends Partial<Prisma.PostFindUniqueArgs>>(args: TMoreArgs) => {
        const procedure = publicProcedure
          .input(zodInput)
          .query(
            ({ ctx, input }) =>
              resolve(ctx, input as TInput, args as any) as Prisma.PostGetPayload<TMoreArgs>
          )
        return procedure
      },
  },
}

const Api_abstract = {
  post: {
    findUnique: Prisma_api.post.findUnique({
      input: z.object({
        id: z.number(),
      }),
      resolve(_, input, moreArgs) {
        const { where, ..._moreArgs } = moreArgs
        return db.post.findUnique({
          where: {
            id: input.id,
            ...where,
          },
          ..._moreArgs,
        })
      },
    }),
  },
}

const Api = router({
  post: router({
    findUnique: Api_abstract.post.findUnique({
      select: Post_single_details_PostSelect,
    }),
  }),
})

const Api_ss = Api.createCaller({})

const post = Api_ss.post.findUnique({ id: 2 })
