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
        // const places_fromGoogleSearch = await client.textSearch({
        //   params: { query: input.query! },
        //   key: "AIzaSyAlZmjA7GGwjG2A6b2lo6RmWE5FbIKu8eQ",
        // })
        const places_fromGoogleSearch = fetch(
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyAlZmjA7GGwjG2A6b2lo6RmWE5FbIKu8eQ&libraries=places"
        )
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
