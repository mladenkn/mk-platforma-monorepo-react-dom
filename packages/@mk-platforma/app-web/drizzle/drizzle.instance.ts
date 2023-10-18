import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"
import env from "~/env.mjs"
import * as Post_schema from "~/domain/post/Post.schema"
import * as User_schema from "~/domain/user/User.schema"
import * as Category_schema from "~/domain/category/Category.schema"

export function getConnectionString(env: string) {
  switch (env) {
    case "dev":
      return "postgresql://postgres:postgres@localhost:5432/za_brata"
    case "test.local":
      return "postgresql://postgres:postgres@localhost:5432/za_brata_test"
    case "staging":
      return "postgresql://postgres:E18xcmX5bA2y8pPu85KF@containers-us-west-116.railway.app:7999/railway"
    case "prod":
      return "postgres://default:dLkKj9hoY7WT@ep-long-rain-221377-pooler.us-east-1.postgres.vercel-storage.com/verceldb?pgbouncer=true&connect_timeout=15"
    case "neon-main": // ovo je na vercelu
      return "postgres://mladenkn:EWT4n5pMetaB@ep-shy-paper-831120.eu-central-1.aws.neon.tech/neondb"
    case "neon-staging":
      return "postgres://mladenkn:EWT4n5pMetaB@ep-lingering-fog-424091.eu-central-1.aws.neon.tech/neondb"
    default:
      throw new Error(`Unsupported env: ${env}`)
  }
}

function drizzle_connect() {
  const queryClient = postgres(env.DATABASE_URL || getConnectionString("dev"), {
    // TODO: mora radit bez defaulta
    ssl: "require",
    max: 1,
  })
  return drizzle(queryClient, { schema: { ...Post_schema, ...User_schema, ...Category_schema } })
}

const db = drizzle_connect()
export default db

export type Drizzle_instance = ReturnType<typeof drizzle_connect>
