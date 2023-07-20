import { publicProcedure, router } from "~/api_/api.server.utils"
import { z } from "zod"
import "@mk-libs/common/server-only"
import { location_api_google__search } from "./Location.api.google"
import db from "~/prisma/instance"

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

export async function Location_many_google_save(query: string) {
  const locations = await location_api_google__search(query)
  for (const location of locations) {
    await db.location.upsert({
      where: { google_id: location.google_id },
      update: location,
      create: location,
    })
  }
  return locations
}

export default Location_api
