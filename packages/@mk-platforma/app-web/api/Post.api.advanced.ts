import { z } from "zod"
import { publicProcedure } from "../trpc.utils"
import { Post_single_details_PostSelect } from "../client/Post.single.details"
import { Prisma, PrismaClient } from "@prisma/client"

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
      <TInput>({
        input,
        resolve,
      }: {
        input: z.ZodType<TInput>
        resolve: (ctx: any, input: TInput, moreArgs: Prisma.PostFindUniqueArgs) => any
      }) =>
      <TMoreArgs extends Partial<Prisma.PostFindUniqueArgs>>(args: TMoreArgs) =>
      (input: any) => {
        const procedure = publicProcedure
          .input(input)
          .query(({ ctx, input }) => resolve(null as any, input as any, args as any))
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

const Api = {
  post: {
    findUnique: Api_abstract.post.findUnique({
      select: Post_single_details_PostSelect,
    }),
  },
}

const a = Api.post.findUnique({})
