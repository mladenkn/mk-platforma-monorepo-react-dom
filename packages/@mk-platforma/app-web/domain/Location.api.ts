import { publicProcedure, router } from "~/api_/api.server.utils"
import { z } from "zod"
import { Location, PrismaClient } from "@prisma/client"
// import { Client } from "@googlemaps/google-maps-services-js"

// const client = new Client({})

const Location_api = router({
  many: publicProcedure
    .input(
      z.object({
        query: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      // if (input.query) {
      //   const locations_googleSearch = await client
      //     .textSearch({
      //       params: {
      //         query: input.query!,
      //         key: "AIzaSyAlZmjA7GGwjG2A6b2lo6RmWE5FbIKu8eQ",
      //       },
      //     })
      //     .then(r =>
      //       r.data.results
      //         .filter(
      //           p =>
      //             p.place_id &&
      //             p.geometry?.location.lng &&
      //             p.geometry?.location.lat &&
      //             p.name &&
      //             p.types?.includes("locality" as any)
      //         )
      //         .map(p => ({
      //           google_id: asNonNil(p.place_id),
      //           name: asNonNil(p.name),
      //           longitude: new Prisma.Decimal(p.geometry?.location.lng!),
      //           latitude: new Prisma.Decimal(p.geometry?.location.lat!),
      //         }))
      //     )
      //   const locations_saved = await upsertLocations(ctx.db, locations_googleSearch)
      //   return locations_saved
      // } else return ctx.db.location.findMany(Location_Dropdown_locationsQuery)
      return ctx.db.location.findMany({
        where: { name: { contains: input.query, mode: "insensitive" } },
        select: {
          id: true,
          name: true,
        },
        take: 10,
      })
    }),
  single: publicProcedure.input(z.object({ id: z.number() })).query(({ ctx, input }) => {
    return ctx.db.location.findUnique({ where: { id: input.id } })
  }),
})

async function upsertLocations(db: PrismaClient, locations: Omit<Location, "id">[]) {
  return Promise.all(
    locations.map(location =>
      db.location.upsert({
        where: { google_id: location.google_id },
        update: location,
        create: location,
        select: {
          id: true,
          name: true,
        },
      })
    )
  )
}

export default Location_api
