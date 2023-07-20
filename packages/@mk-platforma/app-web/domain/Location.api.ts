import { publicProcedure, router } from "~/api_/api.server.utils"
import { z } from "zod"
import "@mk-libs/common/server-only"
import { location_api_google__details, location_api_google__search } from "./Location.api.google"

const Input = z.object({
  query: z.string().optional(),
})

function getQuery(query?: string) {
  return {
    where: query ? { name: { contains: query, mode: "insensitive" } as const } : undefined,
    select: {
      id: true,
      name: true,
      country: true,
      adminAreaLevel1: true,
    },
    take: 10,
    orderBy: {
      posts: {
        _count: "desc" as const,
      },
    },
  }
}

const Location_api = router({
  many: publicProcedure.input(Input).query(async ({ ctx, input }) => {
    const query = getQuery(input.query)
    return ctx.db.location.findMany(query)
  }),

  single: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => ctx.db.location.findUnique({ where: { id: input.id } })),

  many_google: publicProcedure.input(z.string()).query(async ({ input }) => {
    const locations = await location_api_google__search(input)
    return await Promise.all(
      locations.map(location => location_api_google__details(location.google_id))
    )
  }),

  many_google_save: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const locations = await location_api_google__search(input)
    const location_details = await location_api_google__details(locations[0].google_id)
    return await ctx.db.location.create({ data: location_details })
  }),
})

export default Location_api
