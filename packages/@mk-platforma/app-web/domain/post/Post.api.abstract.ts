import { z } from "zod"
import { SuperData_mapper } from "~/api_/api.SuperData"
// import { asNonNil, eva } from "@mk-libs/common/common"
import { Prisma } from "@prisma/client"
import "@mk-libs/common/server-only"

export const Post_list_many = SuperData_mapper(
  z.object({
    categories: z.array(z.number()).optional(),
    search: z.string().optional(),
    location: z.number().optional(),
    location_radius: z.number().optional().default(50),
  }),
  async ({ db }, input) => {
    // const locations = await eva(async () => {
    //   if (input.location) {
    //     const { longitude, latitude } = await db.location
    //       .findUnique({ where: { id: input.location } })
    //       .then(asNonNil)
    //     return await db.$queryRaw<{ id: number }[]>`
    //       SELECT id FROM "Location" WHERE ST_DWithin(ST_MakePoint(longitude, latitude), ST_MakePoint(${longitude}, ${latitude})::geography, ${input.location_radius} * 1000)
    //     `
    //   }
    // })
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
        // location: locations && {
        //   id: {
        //     in: locations.map(({ id }) => id),
        //   },
        // },
        isDeleted: false,
      },
      orderBy: {
        id: "desc",
      },
    } satisfies Prisma.PostFindManyArgs
  },
)

export function Post_queryChunks_search(search: string): Prisma.PostWhereInput {
  return {
    OR: [
      {
        title: { contains: search, mode: "insensitive" },
      },
      {
        description: { contains: search, mode: "insensitive" },
      },
      {
        contact: { contains: search, mode: "insensitive" },
      },
    ],
  }
}
