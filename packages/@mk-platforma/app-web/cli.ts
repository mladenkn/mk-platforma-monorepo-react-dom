import { match } from "ts-pattern"
import { parseCommand, run, getConnectionString } from "./cli.utils"
import "@mk-libs/common/server-only"
import db from "./prisma/instance"
import { isPromise } from "util/types"
import { isArray } from "lodash"

const parsed = parseCommand()
const dbInstance = parsed["db-instance"]

const run_args = match(parsed.command)
  .with("dev", () => [
    {
      POSTGRES_PRISMA_URL: getConnectionString(dbInstance || "dev"),
    },
    `next dev`,
  ])

  .with("dev.test", async () => {
    process.env.POSTGRES_PRISMA_URL = getConnectionString("test.local")
    const user = await seedTestUser()
    return [
      {
        POSTGRES_PRISMA_URL: getConnectionString("test.local"),
        NEXT_PUBLIC_MOCK_USER_ID: user.id,
      },
      `next dev -p 3010`,
    ]
  })

  .with("test", () => [{ TEST_SERVER_COMMAND: "pnpm _c start.test" }, "playwright test --ui"])

  .with("db.prisma", () => [
    {
      POSTGRES_PRISMA_URL: getConnectionString(dbInstance || "dev"),
    },
    `prisma ${parsed._unknown!.join(" ")}`,
  ])

  .with("db.seed", () => [
    { POSTGRES_PRISMA_URL: getConnectionString(dbInstance || "dev") },
    () => require("./data.gen/db.seed.ts"),
  ])

  .with("db.truncate", () => [
    { POSTGRES_PRISMA_URL: getConnectionString(dbInstance || "dev") },
    `prisma db execute --file ./db.truncate.sql`,
  ])

  .with("db.reset", () => [
    {
      POSTGRES_PRISMA_URL: getConnectionString(dbInstance || "dev"),
    },
    [
      `prisma db execute --file ./db.truncate.sql`,
      `prisma db push --accept-data-loss`,
      () => require("./data.gen/db.seed.ts"),
    ],
  ])

  // \dt: get all tables
  .with("db.psql", () => `psql ${getConnectionString(dbInstance || "dev")}`)

  .with("start", () => [
    {
      POSTGRES_PRISMA_URL: getConnectionString(dbInstance || "dev"),
      NEXTAUTH_SECRET: "FPCsMhz7xn+fdf59xGd1O0xiOqHFgxO0iU8xiWGvNxc=",
    },
    "next start",
  ])

  .with("start.test", async () => {
    process.env.POSTGRES_PRISMA_URL = getConnectionString("test.local")
    const user = await seedTestUser()
    return [
      {
        POSTGRES_PRISMA_URL: getConnectionString("test.local"),
        NEXTAUTH_SECRET: "FPCsMhz7xn+fdf59xGd1O0xiOqHFgxO0iU8xiWGvNxc=",
        NEXT_PUBLIC_MOCK_USER_ID: user.id,
      },
      "next start --port 3010",
    ]
  })

  .with("playground", () => [
    { POSTGRES_PRISMA_URL: getConnectionString(dbInstance || "dev") },
    () => require("./playground.ts"),
  ])

  .exhaustive()

if (isPromise(run_args)) {
  run_args.then((a: any) => run(...a))
} else if (!isArray(run_args)) {
  run(run_args)
} else {
  run(...run_args)
}

function seedTestUser() {
  return db.user.upsert({
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
}
