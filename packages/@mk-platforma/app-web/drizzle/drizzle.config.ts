import type { Config } from "drizzle-kit"
import { cli_getConnectionString } from "~/cli.utils"

export default {
  schema: "./drizzle/drizzle.schema.ts",
  // out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || cli_getConnectionString("dev"),
  },
} satisfies Config
