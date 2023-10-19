import { drizzle } from "drizzle-orm/better-sqlite3"
import Database from "better-sqlite3"
import { migrate } from "drizzle-orm/better-sqlite3/migrator"
import { Category } from "./drizzle-sqlite.schema"

async function main() {
  const sqlite = new Database(":memory:")
  const db = drizzle(sqlite, { schema: { Category } })

  migrate(db, { migrationsFolder: "./drizzle/migrations" })

  console.log("14", sqlite)

  await db.query.Category.findMany().then(r => console.log(16, r))

  await db.insert(Category).values([{ label: "kategorija 1" }, { label: "kategorija 2" }])

  await db.query.Category.findMany().then(r => console.log(20, r))
}

main().then(() => "done")
