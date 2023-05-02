import { z } from "zod"
import { Post_queryChunks_search } from "./Post.api"
import { SuperData_query } from "../SuperData"

export const Post_api_abstract = {
  list: SuperData_query(
    z.object({
      categories: z.array(z.number()).optional(),
      search: z.string().optional(),
    }),
    async ({ db }, input) => {
      // const locations = await db.$queryRaw<{ id: number }[]>`
      //   SELECT id FROM "Location" WHERE ST_DWithin(ST_MakePoint(longitude, latitude), ST_MakePoint(16.4435148, 43.5147118)::geography, 50 * 1000)
      // `
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
          // location: {
          //   id: {
          //     in: locations.map(({ id }) => id),
          //   },
          // },
        },
      }
    }
  ),
}
