import { match } from "ts-pattern"
import { parseCommand, run, getConnectionString } from "./cli.utils"
import "@mk-libs/common/server-only"

const parsed = parseCommand()
const dbInstance = parsed["db-instance"]

const run_args = match(parsed.command)
  .with("dev", () => [
    {
      DATABASE_URL: getConnectionString(dbInstance || "dev"),
      POSTGRES_PRISMA_URL: getConnectionString(dbInstance || "dev"),
    },
    `next dev`,
  ])

  .with("db.prisma", () => [
    {
      DATABASE_URL: getConnectionString(dbInstance || "dev"),
      POSTGRES_PRISMA_URL: getConnectionString(dbInstance || "dev"),
    },
    `prisma ${parsed._unknown!.join(" ")}`,
  ])

  .with("db.seed", () => [
    { DATABASE_URL: getConnectionString(dbInstance || "dev") },
    () => require("./data.gen/db.seed.ts"),
  ])

  .with("db.truncate", () => [
    { DATABASE_URL: getConnectionString(dbInstance || "dev") },
    `prisma db execute --file ./db.truncate.sql`,
  ])

  .with("db.reset", () => [
    {
      DATABASE_URL: getConnectionString(dbInstance || "dev"),
      POSTGRES_PRISMA_URL: getConnectionString(dbInstance || "dev"),
    },
    [
      `prisma db execute --file ./db.truncate.sql`,
      `prisma db push --accept-data-loss`,
      () => require("./data.gen/db.seed.ts"),
    ],
  ])

  // \dt: get all tables
  .with("db.psql", () => [`psql ${getConnectionString(dbInstance || "dev")}`])

  .with("build", () => ["next build"])

  .with("start", () => [
    {
      DATABASE_URL: getConnectionString(dbInstance || "test.server"),
      NEXTAUTH_SECRET: "FPCsMhz7xn+fdf59xGd1O0xiOqHFgxO0iU8xiWGvNxc=",
    },
    "next start",
  ])

  .with("playground", () => [
    { DATABASE_URL: getConnectionString(dbInstance || "dev") },
    () => require("./playground.ts"),
  ])

  .with("ts", () => ["tsc --noEmit"])

  .exhaustive()

run(...run_args)
