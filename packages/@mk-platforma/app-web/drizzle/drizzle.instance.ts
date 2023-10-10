import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"
import { getConnectionString } from "~/cli.utils"
import * as schema from "./schema"

export function drizzle_connect() {
  const queryClient = postgres(getConnectionString("dev"))
  const db = drizzle(queryClient, { schema })
  return db
}

export type Drizzle_instance = ReturnType<typeof drizzle_connect>
