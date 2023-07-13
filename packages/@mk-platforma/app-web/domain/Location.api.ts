import { publicProcedure, router } from "~/api_/api.server.utils"
import { z } from "zod"
import { Location, Prisma, PrismaClient } from "@prisma/client"
import "@mk-libs/common/server-only"
import { Client } from "@googlemaps/google-maps-services-js"
import { asNonNil } from "@mk-libs/common/common"

const client = new Client({})

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

const key = "AIzaSyAlZmjA7GGwjG2A6b2lo6RmWE5FbIKu8eQ"

const Location_api = router({
  many: publicProcedure.input(Input).query(async ({ ctx, input }) => {
    if (input.query) {
      const locations_googleSearch = await googleApi_location_getMany(input.query)
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
        const { country, adminAreaLevel1 } = await googleApi_location_getDetails(location.google_id)
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

function googleApi_location_getMany(query: string) {
  return client
    .textSearch({
      params: {
        query: query,
        key,
      },
    })
    .then(r =>
      r.data.results
        .filter(
          p =>
            p.place_id &&
            p.geometry?.location.lng &&
            p.geometry?.location.lat &&
            p.name &&
            p.types?.includes("locality" as any)
        )
        .map(p => ({
          google_id: asNonNil(p.place_id),
          name: asNonNil(p.name),
          longitude: new Prisma.Decimal(p.geometry?.location.lng!),
          latitude: new Prisma.Decimal(p.geometry?.location.lat!),
        }))
    )
}

async function googleApi_location_getDetails(id: string) {
  const details = await client
    .placeDetails({
      params: {
        key,
        place_id: id,
      },
    })
    .then(r => r.data.result)

  const country = asNonNil(
    details.address_components?.find(c => c.types.includes("country" as any))?.long_name
  )
  const adminAreaLevel1 = details.address_components?.find(c =>
    c.types.includes("administrative_area_level_1" as any)
  )?.long_name

  return {
    country,
    adminAreaLevel1,
  }
}

export default Location_api
