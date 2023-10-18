import { publicProcedure, router } from "~/api_/api.server.utils"
import { z } from "zod"
import "@mk-libs/common/server-only"
import { location_api_google__search } from "./Location.api.google"
import db from "~/drizzle/drizzle.instance"
import { Location } from "~/domain/post/Post.schema"
import { omit } from "lodash"
import { eq, ilike } from "drizzle-orm"

const Input = z.object({
  query: z.string().optional(),
})

const Location_api = router({
  many: publicProcedure.input(Input).query(async ({ ctx, input: { query } }) =>
    ctx.db.query.Location.findMany({
      where: query ? ilike(Location.name, `%${query}%`) : undefined,
      columns: {
        id: true,
        name: true,
        country: true,
        adminAreaLevel1: true,
      },
      limit: 10,
      // TODO: vjer order by posts count
    }),
  ),
  single: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) =>
      ctx.db.query.Location.findFirst({ where: eq(Location.id, input.id) }).then(l => l || null),
    ),
})

export async function Location_google_find_save(query: string) {
  const location = await location_api_google__search(query).then(r => r[0])
  const mapped = {
    ...location,
    longitude: location.longitude.toNumber(),
    latitude: location.latitude.toNumber(),
  }
  return db
    .insert(Location)
    .values(mapped)
    .onConflictDoUpdate({
      target: Location.google_id,
      set: omit(mapped, "google_id"),
    })
}

export default Location_api
