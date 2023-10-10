import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"
import * as schema from "./schema"
import env from "~/env.mjs"
import { asNonNil } from "@mk-libs/common/common"

export function drizzle_connect() {
  const queryClient = postgres(asNonNil(env.DATABASE_URL), { ssl: "require", max: 1 })
  const db = drizzle(queryClient, { schema })
  return db
}

export type Drizzle_instance = ReturnType<typeof drizzle_connect>
