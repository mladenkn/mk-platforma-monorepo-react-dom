import { asNonNil } from "@mk-libs/common/common"
import type { Config } from "drizzle-kit"

export default {
  schema: "./drizzle/drizzle.schema.ts",
  // out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: asNonNil(process.env.DATABASE_URL),
  },
} satisfies Config
