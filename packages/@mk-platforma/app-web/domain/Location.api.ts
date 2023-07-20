import { publicProcedure, router } from "~/api_/api.server.utils"
import { z } from "zod"
import { Location, PrismaClient } from "@prisma/client"
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
    if (input.query) {
      const locations_googleSearch = await location_google_api.many(input.query)
      await upsertLocations(ctx.db, locations_googleSearch)

      const locations_googleSearch_googleIds = locations_googleSearch.map(i => i.google_id)
      const locations = await ctx.db.location.findMany({
        where: { google_id: { in: locations_googleSearch_googleIds } },
        select: {
          id: true,
          name: true,
          country: true,
        },
        take: 10,
        orderBy: {
          posts: {
            _count: "desc",
          },
        },
      })
      return locations
    } else return ctx.db.location.findMany(getQuery())
  }),
  single: publicProcedure.input(z.object({ id: z.number() })).query(({ ctx, input }) => {
    return ctx.db.location.findUnique({ where: { id: input.id } })
  }),
})

type Save_input = Omit<Location, "id" | "country" | "adminAreaLevel1">

async function upsertLocations(db: PrismaClient, locations: Save_input[]) {
  const mappped = await Promise.all(
    locations.map(async location => {
      const loc = await db.location.findUnique({ where: { google_id: location.google_id } })
      if (loc) {
        return { ...location, country: loc.country }
      } else {
        const { country, adminAreaLevel1 } = await location_google_api.details(location.google_id)
        return { ...location, country, adminAreaLevel1 }
      }
    })
  )
  return Promise.all(
    mappped.map(
      async location =>
        await db.location.upsert({
          where: { google_id: location.google_id },
          update: location,
          create: location,
        })
    )
  )
}

export default Location_api
