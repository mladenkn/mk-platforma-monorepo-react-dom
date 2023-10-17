import { publicProcedure, router } from "~/api_/api.server.utils"
import { z } from "zod"
import "@mk-libs/common/server-only"
import { location_api_google__search } from "./Location.api.google"
import db_drizzle from "~/drizzle/drizzle.instance"
import { Location } from "~/drizzle/drizzle.schema"
import { omit } from "lodash"

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
})

export async function Location_google_find_save(query: string) {
  const location = await location_api_google__search(query).then(r => r[0])
  const mapped = {
    ...location,
    googleId: location.google_id,
    longitude: location.longitude.toNumber(),
    latitude: location.latitude.toNumber(),
  }
  return db_drizzle
    .insert(Location)
    .values(mapped)
    .onConflictDoUpdate({
      target: Location.googleId,
      set: omit(mapped, "googleId"),
    })
}

export default Location_api
