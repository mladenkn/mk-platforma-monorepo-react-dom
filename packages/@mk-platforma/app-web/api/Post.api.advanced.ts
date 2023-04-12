import { z } from "zod"
import { publicProcedure, router } from "../trpc.utils"
import { Post_single_details_PostSelect } from "../client/Post.single.details"
import { Prisma, PrismaClient } from "@prisma/client"

const db = new PrismaClient()

type ResolveClassic<TContext, TInput, TOutput> = (
  ctx: TContext,
  input: TInput,
  moreArgs: Prisma.PostFindUniqueArgs
) => TOutput

const Prisma_api = {
  post: {
    findUnique:
      <TInput, TOutput>({
        input: zodInput,
        resolve,
      }: {
        input: z.ZodType<TInput>
        resolve:
          | ResolveClassic<{}, TInput, TOutput>
          | ((input: TInput) => Prisma.PostFindUniqueArgs)
      }) =>
      <TMoreArgs extends Partial<Prisma.PostFindUniqueArgs>>(moreArgs: TMoreArgs) => {
        const procedure = publicProcedure.input(zodInput).query(({ ctx, input }) => {
          if (resolve.arguments.length === 3)
            return (resolve as ResolveClassic<{}, TInput, TOutput>)(
              ctx,
              input as TInput,
              moreArgs as any
            ) as Prisma.PostGetPayload<TMoreArgs>
          else if (resolve.arguments.length === 1) {
            const args = (resolve as (input: TInput) => Prisma.PostFindUniqueArgs)(input as any)
            return db.post.findUnique({
              ...args,
              ...moreArgs,
            }) as any as Prisma.PostGetPayload<TMoreArgs>
          }
        })
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
