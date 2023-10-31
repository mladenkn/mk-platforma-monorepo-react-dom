import type { Config } from "drizzle-kit"
import { getConnectionString } from "~/cli.utils"

export default {
  schema: "./drizzle/drizzle.schema.ts",
  // out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || getConnectionString("dev"),
  },
} satisfies Config
