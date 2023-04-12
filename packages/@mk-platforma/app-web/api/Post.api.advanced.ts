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
        resolve: (ctx: any, input: TInput, moreArgs: any) => any
      }) =>
      <TMoreArgs extends Partial<Prisma.PostFindUniqueArgs>>(args: Partial<TMoreArgs>) =>
      (input: any) =>
        ({} as any as Promise<Prisma.PostGetPayload<TMoreArgs>>),
  },
}

const Api_abstract = {
  post: {
    findUnique: Prisma_api.post.findUnique({
      input: z.object({
        id: z.number(),
      }),
      resolve(ctx: any, input, moreArgs: any) {
        return db.post.findUnique({
          where: {
            id: input.id,
          },
          ...moreArgs,
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
