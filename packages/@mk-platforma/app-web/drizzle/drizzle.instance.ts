import { drizzle } from "drizzle-orm/better-sqlite3"
import Database from "better-sqlite3"
import { migrate } from "drizzle-orm/better-sqlite3/migrator"
import * as Post_schema from "~/domain/post/Post.schema"
import * as User_schema from "~/domain/user/User.schema"
import * as Category_schema from "~/domain/category/Category.schema"
import data_gen_seed from "~/data.gen/data.gen.seed"
import { exec, spawn } from "child_process"

async function _connect() {
  const db_sqlite = new Database(":memory:")
  const db_drizzle = drizzle(db_sqlite, {
    schema: { ...Post_schema, ...User_schema, ...Category_schema },
  })
  console.log("Executing migrations")
  await run_withExec(
    "rm -rf migrations && pnpm drizzle-kit generate:sqlite --out migrations --schema drizzle.schema.ts",
  )
  console.log("Executed migrations")
  migrate(db_drizzle, { migrationsFolder: "./drizzle/migrations" })
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

function runCommand(command: string) {
  const cmd = spawn(command, {
    env: process.env,
  })
  return new Promise((resolve, reject) => {
    cmd.stdout?.on?.("data", data => process.stdout.write(data.toString()))
    cmd.stderr?.on?.("data", data => process.stderr.write(data.toString()))
    cmd.on?.("error", error => {
      reject({ error, code: -1 })
      process.stderr.write(error.message)
    })
    cmd.on?.("close", code => resolve({ code }))
  })
}

function run_withExec(command: string) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(error)
        reject({ error, code: -1 })
      }
      console.log(stdout ? stdout : stderr)
      resolve({ code: 1 })
    })
  })
}
