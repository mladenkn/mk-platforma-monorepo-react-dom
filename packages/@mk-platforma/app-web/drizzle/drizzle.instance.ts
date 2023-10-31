import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"
import * as schema from "./drizzle.schema"
import { asNonNil } from "@mk-libs/common/common"

export default function drizzle_connect() {
  const queryClient = postgres(asNonNil(process.env.DATABASE_URL), {
    ssl: "require",
    max: 1,
  })
  return drizzle(queryClient, { schema })
}

export type Drizzle_instance = ReturnType<typeof drizzle_connect>
