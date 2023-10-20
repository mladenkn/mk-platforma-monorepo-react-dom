import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"
import * as Post_schema from "~/domain/post/Post.schema"
import * as User_schema from "~/domain/user/User.schema"
import * as Category_schema from "~/domain/category/Category.schema"
import { asNonNil } from "@mk-libs/common/common"

export default function drizzle_connect() {
  const queryClient = postgres(asNonNil(process.env.DATABASE_URL), {
    ssl: "require",
    max: 1,
  })
  return drizzle(queryClient, { schema: { ...Post_schema, ...User_schema, ...Category_schema } })
}

export type Drizzle_instance = ReturnType<typeof drizzle_connect>
