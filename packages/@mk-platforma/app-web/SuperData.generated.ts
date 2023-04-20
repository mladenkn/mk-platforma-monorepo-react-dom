import { Prisma } from "@prisma/client"
import { Api_context } from "./trpc.server"

export const DataSelectors_create = ({ db, userId }: Api_context) => ({
  post: {
    list: <TParms1 extends Prisma.PostFindManyArgs, TParams2 extends Prisma.PostFindManyArgs>(
      params1: TParms1,
      params2: TParams2
    ) => {
      return db.post.findMany({
        ...params1,
        ...params2,
      }) as Promise<Prisma.PostGetPayload<typeof params1 & typeof params2>[]>
    },
  },
})

export type DataSelectors = ReturnType<typeof DataSelectors_create>
