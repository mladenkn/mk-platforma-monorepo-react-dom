import { publicProcedure, router } from "../trpc.server.utils"
import { Client } from "@googlemaps/google-maps-services-js"
import { z } from "zod"

const client = new Client({})

const Location_api = router({
  many: publicProcedure
    .input(
      z.object({
        query: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      if (input.query) {
        const places_googleSearch = await client
          .textSearch({
            params: { query: input.query!, key: "AIzaSyAlZmjA7GGwjG2A6b2lo6RmWE5FbIKu8eQ" },
          })
          .then(r =>
            r.data.results.map((p, i) => ({
              id: i,
              google_id: p.place_id,
              name: p.name,
              longitude: p.geometry?.location.lng,
              latitude: p.geometry?.location.lat,
            }))
          )
        console.log(places_googleSearch)
        return places_googleSearch
      } else {
        return ctx.db.location.findMany({
          select: {
            id: true,
            name: true,
          },
        })
      }
    }),
})

export default Location_api
