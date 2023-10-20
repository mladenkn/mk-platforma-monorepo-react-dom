import { match } from "ts-pattern"
import {
  parseCommand,
  run,
  getConnectionString,
  Api_ss_cli_create,
  Cli_run_EnvVars,
  Cli_run_Command,
} from "./cli.utils"
import "@mk-libs/common/server-only"
import { isArray } from "lodash"
import { location_api_google__search } from "./domain/Location.api.google"
import { Location_google_find_save } from "./domain/Location.api"
import { asString } from "@mk-libs/common/common"
import db from "./drizzle/drizzle.instance"
import data_gen_seed from "./data.gen/data.gen.seed"

const parsed = parseCommand()
const dbInstance = parsed["db-instance"]
const DATABASE_URL = getConnectionString(dbInstance || "dev")

type run_args_type =
  | [Cli_run_EnvVars, Cli_run_Command | Cli_run_Command[]]
  | Cli_run_Command
  | Cli_run_Command[]

const run_args = match(parsed.command)
  .with("dev", () => [
    {
      DATABASE_URL,
      UPLOADTHING_SECRET:
        "sk_live_8f78c8c092e0657bb96f964c1527e3b5257969372b653a8b4d711cb7e1fc9cfb",
      UPLOADTHING_APP_ID: "2axqlwskhd",
    },
    `next dev`,
  ])

  .with("db.prisma", () => [{ DATABASE_URL }, `prisma ${parsed._unknown!.join(" ")}`])

  .with("db.seed", () => [{ DATABASE_URL }, () => data_gen_seed(db)])

  .with("db.truncate", () => [{ DATABASE_URL }, `prisma db execute --file ./db.truncate.sql`])

  .with("db.reset", () => [
    { DATABASE_URL },
    [
      `prisma db execute --file ./db.truncate.sql`,
      `prisma db push --accept-data-loss`,
      () => data_gen_seed(db),
    ],
  ])

  // \dt: get all tables
  .with("db.psql", () => `psql ${getConnectionString(dbInstance || "dev")}`)

  .with("playground", () => [{ DATABASE_URL }, () => require("./playground.ts")])

  .with("location.google.find", () => [
    {},
    async () => {
      const searchQuery = asString(parsed._unknown?.[0])
      location_api_google__search(searchQuery)
        .then(r => console.log(r[0]))
        .catch(console.error)
    },
  ])

  .with("location.google.find.save", () => [
    { DATABASE_URL },
    async () => {
      const searchQuery = asString(parsed._unknown![0])
      Location_google_find_save(db, searchQuery).then(console.log).catch(console.error)
    },
  ])

  .with("location.many", async () => [
    { DATABASE_URL },
    async () => {
      const api = await Api_ss_cli_create()
      const query = asString(parsed._unknown?.[0])
      api.location.many({ query }).then(console.log).catch(console.error)
    },
  ])

  .with("depr.test", () => [{ TEST_SERVER_COMMAND: "pnpm _c start.test" }, "playwright test --ui"])

  .run() as run_args_type

// @ts-ignore
if (isArray(run_args)) run(...run_args).then(() => process.exit(0))
else run(run_args).then(() => process.exit(0))
