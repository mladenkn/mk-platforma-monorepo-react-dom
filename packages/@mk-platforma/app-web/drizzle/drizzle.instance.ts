import { drizzle } from "drizzle-orm/better-sqlite3"
import Database from "better-sqlite3"
import { migrate } from "drizzle-orm/better-sqlite3/migrator"
import * as Post_schema from "~/domain/post/Post.schema"
import * as User_schema from "~/domain/user/User.schema"
import * as Category_schema from "~/domain/category/Category.schema"
import data_gen_seed from "~/data.gen/data.gen.seed"

function drizzle_connect() {
  const db_sqlite = new Database(":memory:")
  const db_drizzle = drizzle(db_sqlite, {
    schema: { ...Post_schema, ...User_schema, ...Category_schema },
  })
  migrate(db_drizzle, { migrationsFolder: "./drizzle/migrations" })
  return db_drizzle
}

const db = drizzle_connect()
export default db

const global_isDbSeeded = global as unknown as {
  value: boolean
}

if (!global_isDbSeeded.value) {
  data_gen_seed(db).then(() => {
    global_isDbSeeded.value = true
    console.log(17, "done seeding db")
  })
}

export type Drizzle_instance = ReturnType<typeof drizzle_connect>
