import { match } from "ts-pattern"
import { parseCommand, run, getConnectionString, Api_ss_cli_create } from "./cli.utils"
import "@mk-libs/common/server-only"
import db from "./prisma/instance"
import { isPromise } from "util/types"
import { isArray } from "lodash"
import { location_api_google__search } from "./domain/Location.api.google"
import { Location_many_google_save } from "./domain/Location.api"
import { asString } from "@mk-libs/common/common"

const parsed = parseCommand()
const dbInstance = parsed["db-instance"]

const run_args = match(parsed.command)
  .with("dev", () => [
    {
      DATABASE_URL: getConnectionString(dbInstance || "dev"),
      UPLOADTHING_SECRET:
        "sk_live_8f78c8c092e0657bb96f964c1527e3b5257969372b653a8b4d711cb7e1fc9cfb",
      UPLOADTHING_APP_ID: "2axqlwskhd",
    },
    `next dev`,
  ])

  .with("dev.test", async () => {
    process.env.DATABASE_URL = getConnectionString("test.local")
    const user = await seedTestUser()
    return [
      {
        DATABASE_URL: getConnectionString("test.local"),
        NEXT_PUBLIC_MOCK_USER_ID: user.id,
        // fali uploadthing
      },
      `next dev -p 3010`,
    ]
  })

  .with("test", () => [{ TEST_SERVER_COMMAND: "pnpm _c start.test" }, "playwright test --ui"])

  .with("db.prisma", () => [
    {
      DATABASE_URL: getConnectionString(dbInstance || "dev"),
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
    },
    [
      `prisma db execute --file ./db.truncate.sql`,
      `prisma db push --accept-data-loss`,
      "tsx ./data.gen/db.seed.ts",
    ],
  ])

  // \dt: get all tables
  .with("db.psql", () => `psql ${getConnectionString(dbInstance || "dev")}`)

  .with("start.staging", () => [
    {
      DATABASE_URL: getConnectionString("staging"),
      NEXTAUTH_SECRET: "FPCsMhz7xn+fdf59xGd1O0xiOqHFgxO0iU8xiWGvNxc=",
      UPLOADTHING_SECRET:
        "sk_live_1e63ba0daf256fad652b9cb7cc67d322bb51f60e9c5383ce7b5f42bd9b86e3ad",
      UPLOADTHING_APP_ID: "5zs915ybo0",
    },
    "next start",
  ])

  .with("start.test", async () => {
    process.env.DATABASE_URL = getConnectionString("test.local")
    const user = await seedTestUser()
    return [
      {
        DATABASE_URL: getConnectionString("test.local"),
        NEXTAUTH_SECRET: "FPCsMhz7xn+fdf59xGd1O0xiOqHFgxO0iU8xiWGvNxc=",
        NEXT_PUBLIC_MOCK_USER_ID: user.id,
        // fali uploadthing
      },
      "next start --port 3010",
    ]
  })

  .with("playground", () => [
    { DATABASE_URL: getConnectionString(dbInstance || "dev") },
    () => require("./playground.ts"),
  ])

  .with("location.google.many", () => [
    {},
    async () => {
      const searchQuery = asString(parsed._unknown?.[0])
      location_api_google__search(searchQuery).then(console.log).catch(console.error)
    },
  ])

  .with("location.google.many.save", () => [
    {
      DATABASE_URL: getConnectionString(dbInstance || "dev"),
    },
    async () => {
      const searchQuery = asString(parsed._unknown![0])
      Location_many_google_save(searchQuery).then(console.log).catch(console.error)
    },
  ])

  .with("location.many", async () => [
    {
      DATABASE_URL: getConnectionString(dbInstance || "dev"),
    },
    async () => {
      const api = await Api_ss_cli_create()
      const query = asString(parsed._unknown?.[0])
      api.location.many({ query }).then(console.log).catch(console.error)
    },
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
