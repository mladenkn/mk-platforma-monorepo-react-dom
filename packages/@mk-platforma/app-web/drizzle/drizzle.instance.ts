import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"
import * as schema from "./drizzle.schema"
import env from "~/env.mjs"

function drizzle_connect() {
  const queryClient = postgres(
    env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/za_brata",
    {
      // TODO: mora radit bez defaulta
      ssl: "require",
      max: 1,
    },
  )
  const db = drizzle(queryClient, { schema })
  return db
}

export const db_drizzle = drizzle_connect()

export type Drizzle_instance = ReturnType<typeof drizzle_connect>
