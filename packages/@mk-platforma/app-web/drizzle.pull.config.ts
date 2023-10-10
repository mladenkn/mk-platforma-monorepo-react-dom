import type { Config } from "drizzle-kit"
import { getConnectionString } from "cli.utils"

export default {
  // schema: "./src/schema/*",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: getConnectionString("dev"),
  },
} satisfies Config
