import { drizzle } from "drizzle-orm/better-sqlite3"
import Database from "better-sqlite3"
import { migrate } from "drizzle-orm/better-sqlite3/migrator"
import * as Post_schema from "~/domain/post/Post.schema"
import * as User_schema from "~/domain/user/User.schema"
import * as Category_schema from "~/domain/category/Category.schema"
import data_gen_seed from "~/data.gen/data.gen.seed"
// import path, { dirname } from "path"

var appRoot = require("app-root-path")

async function _connect() {
  const db_sqlite = new Database(":memory:")
  const db_drizzle = drizzle(db_sqlite, {
    schema: { ...Post_schema, ...User_schema, ...Category_schema },
  })
  // console.log("Directory 1", require.main?.filename ? dirname(require.main?.filename) : "nema")
  // console.log("Directory 2", __dirname)
  // console.log("Directory 3", path.resolve(__dirname))

  console.log("Directory 4", appRoot)

  migrate(db_drizzle, {
    migrationsFolder:
      // "/home/mladen/projekti/mk-platforma-monorepo-react-dom/packages/@mk-platforma/app-web/drizzle/migrations",
      `${appRoot}/packages/@mk-platforma/app-web/drizzle/migrations`,
  })
  await data_gen_seed(db_drizzle)
  console.log("drizzle connect")
  return db_drizzle
}

export type Drizzle_instance = Awaited<ReturnType<typeof _connect>>

declare module globalThis {
  let drizzle_instance: Drizzle_instance | undefined
}

export default async function drizzle_connect() {
  if (!globalThis.drizzle_instance) globalThis.drizzle_instance = await _connect()
  return globalThis.drizzle_instance
}
