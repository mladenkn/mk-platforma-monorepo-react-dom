import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"
import * as schema from "./schema"
import env from "~/env.mjs"
import { getConnectionString } from "~/cli.utils"

export function drizzle_connect() {
  const queryClient = postgres(env.DATABASE_URL || getConnectionString("dev"), {
    // TODO: mora radit bez defaulta
    ssl: "require",
    max: 1,
  })
  const db = drizzle(queryClient, { schema })
  return db
}

export type Drizzle_instance = ReturnType<typeof drizzle_connect>
