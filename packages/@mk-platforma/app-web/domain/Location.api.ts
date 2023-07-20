import { authorizedRoute, publicProcedure, router } from "~/api_/api.server.utils"
import { z } from "zod"
import "@mk-libs/common/server-only"
import Location_api_google_create from "./Location.api.google"

const location_google_api = Location_api_google_create()

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

  many_google: publicProcedure
    .input(z.string())
    .query(({ ctx, input }) => location_google_api.search(input)),

  many_google_save: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const locations = await location_google_api.search(input)
    const location_details = await location_google_api.details(locations[0].google_id)
    return await ctx.db.location.create({ data: location_details })
  }),

  single: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => ctx.db.location.findUnique({ where: { id: input.id } })),
})

export default Location_api
