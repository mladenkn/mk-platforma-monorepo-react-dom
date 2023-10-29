import { match } from "ts-pattern"
import {
  parseCommand,
  run,
  getConnectionString,
  Cli_run_EnvVars,
  Cli_run_Command,
  Cli_Context,
} from "./cli.utils"
import "@mk-libs/common/server-only"
import { isArray } from "lodash"
import { location_api_google__search } from "./domain/Location.api.google"
import { Location_google_find_save } from "./domain/Location.api"
import { asString } from "@mk-libs/common/common"
import data_seed_fakeRandomized from "~/data.seed.fakeRandomized/data.seed.fakeRandomized"

const parsed = parseCommand()
const dbInstance = parsed["db-instance"] || "dev"

type run_args_type =
  | [Cli_run_EnvVars, Cli_run_Command | Cli_run_Command[]]
  | Cli_run_Command
  | Cli_run_Command[]

const run_args = match(parsed.command)
  .with("dev", () => [
    {
      UPLOADTHING_SECRET:
        "sk_live_8f78c8c092e0657bb96f964c1527e3b5257969372b653a8b4d711cb7e1fc9cfb",
      UPLOADTHING_APP_ID: "2axqlwskhd",
    },
    `next dev`,
  ])

  .with("dev.test", () => [{}, () => console.log("dev.test tuu sammm")])

  .with("db.prisma", () => [{}, `prisma ${parsed._unknown!.join(" ")}`])

  .with("db.seed", () => [
    {},
    ({ apiContext }: Cli_Context) => data_seed_fakeRandomized(apiContext.db),
  ])

  .with("db.truncate", () => [{}, `prisma db execute --file ./db.truncate.sql`])

  .with("db.reset", () => [
    {},
    [
      `prisma db execute --file ./db.truncate.sql`,
      `prisma db push --accept-data-loss`,
      ({ apiContext }: Cli_Context) => data_seed_fakeRandomized(apiContext.db),
    ],
  ])

  // \dt: get all tables
  .with("db.psql", () => `psql ${getConnectionString(dbInstance)}`)

  .with("playground", () => [{}, () => require("./playground.ts")])

  .with("location.google.find", () => [
    {},
    () => {
      const searchQuery = asString(parsed._unknown?.[0])
      return location_api_google__search(searchQuery)
        .then(r => console.log(r[0]))
        .catch(console.error)
    },
  ])

  .with("location.google.find.save", () => [
    {},
    ({ apiContext }: Cli_Context) => {
      const searchQuery = asString(parsed._unknown?.[0])
      return Location_google_find_save(apiContext.db, searchQuery)
        .then(console.log)
        .catch(console.error)
    },
  ])

  .with("location.many", () => [
    {},
    ({ api }: Cli_Context) => {
      const query = parsed._unknown?.[0] || ""
      return api.location.many({ query }).then(console.log).catch(console.error)
    },
  ])

  .run() as run_args_type

// @ts-ignore
if (isArray(run_args)) run(...run_args).then(() => process.exit(0))
else run(run_args).then(() => process.exit(0))
