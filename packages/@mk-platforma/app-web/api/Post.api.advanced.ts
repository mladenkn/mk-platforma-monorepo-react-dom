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

// @ts-ignore
const post_single2_base = createMethod(select =>
  publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ input }) => {
      const post = await db.post.findUnique({
        where: { id: input.id },
        select,
      })
      return post
    })
)

const Database_abstract = {
  post: {
    findUnique:
      (inner: any) =>
      <TMoreArgs extends Partial<Prisma.PostFindUniqueArgs>>(args: Partial<TMoreArgs>) =>
      (input: any) =>
        createMethod(inner(args)) as any as Promise<Prisma.PostGetPayload<TMoreArgs>>,
  },
}

const Database = {
  post: Database_abstract.post.findUnique(post_single2_base)({
    select: Post_single_details_PostSelect,
  }),
}

const a = Database.post({})
