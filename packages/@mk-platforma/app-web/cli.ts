import { match } from "ts-pattern"
import { parseCommand, run, getConnectionString } from "./cli.utils"
import "@mk-libs/common/server-only"
import db from "./prisma/instance"
import { isPromise } from "util/types"

const parsed = parseCommand()
const dbInstance = parsed["db-instance"] || "dev"

const run_args = match(parsed.command)
  .with("dev", () => [{ DATABASE_URL: getConnectionString(dbInstance) }, `next dev`])

  .with("dev.test", async () => {
    process.env.DATABASE_URL = getConnectionString("test.local")
    const user = await db.user.upsert({
      where: { name: "__test__" },
      create: {
        name: "__test__",
        avatarStyle: {},
        email: "test@test.hr",
        emailVerified: new Date(),
        canMutate: true,
      },
      update: {},
    })
    return [{ DATABASE_URL: getConnectionString("test.local"), MOCK_USER_ID: user.id }, `next dev`]
  })

  .with("db.prisma", () => [
    { DATABASE_URL: getConnectionString(dbInstance) },
    `prisma ${parsed._unknown!.join(" ")}`,
  ])

  .with("db.seed", () => [
    { DATABASE_URL: getConnectionString(dbInstance) },
    () => require("./data.gen/db.seed.ts"),
  ])

  .with("db.truncate", () => [
    { DATABASE_URL: getConnectionString(dbInstance) },
    `prisma db execute --file ./db.truncate.sql`,
  ])

  .with("db.reset", () => [
    { DATABASE_URL: getConnectionString(dbInstance) },
    [
      `prisma db execute --file ./db.truncate.sql`,
      `prisma db push --accept-data-loss`,
      () => require("./data.gen/db.seed.ts"),
    ],
  ])

  // \dt: get all tables
  .with("db.psql", () => [`psql ${getConnectionString(dbInstance)}`])

  .with("build", () => [
    {
      DATABASE_URL: getConnectionString(dbInstance),
      NEXTAUTH_SECRET: "FPCsMhz7xn+fdf59xGd1O0xiOqHFgxO0iU8xiWGvNxc=",
    },
    "next build",
  ])

  .with("start", () => [
    {
      DATABASE_URL: getConnectionString(dbInstance),
      NEXTAUTH_SECRET: "FPCsMhz7xn+fdf59xGd1O0xiOqHFgxO0iU8xiWGvNxc=",
    },
    "next start",
  ])

  .with("playground", () => [
    { DATABASE_URL: getConnectionString(dbInstance) },
    () => require("./playground.ts"),
  ])

  .with("ts", () => ["tsc --noEmit"])

  .exhaustive()

if (isPromise(run_args)) {
  run_args.then((a: any) => run(...a))
} else run(...run_args)
