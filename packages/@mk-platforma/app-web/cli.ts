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

type run_args_type =
  | [Cli_run_EnvVars, Cli_run_Command | Cli_run_Command[]]
  | Cli_run_Command
  | Cli_run_Command[]

const run_args = match(parsed.command)
  .with("dev", () => [{}, `next dev`])

  .with("dev.test", () => [
    {},
    () => {
      console.log(__dirname)
    },
  ])

  .with("db.prisma", () => [{}, `prisma ${parsed._unknown!.join(" ")}`])

  .with("db.seed", () => [{}, ({ db }: Cli_Context) => data_seed_fakeRandomized(db)])

  .with("db.truncate", () => [{}, `psql ${_getConnectionString()} --file=./db.truncate.sql`])

  .with("db.reset", () => [
    {},
    [
      `psql ${_getConnectionString()} --file=./db.truncate.sql`,
      "drizzle-kit push:pg --config=./drizzle/drizzle.config.ts",
      ({ db }: Cli_Context) => data_seed_fakeRandomized(db),
    ],
  ])

  // \dt: get all tables
  .with("db.psql", () => [{}, `psql ${_getConnectionString()}`])

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
    ({ db }: Cli_Context) => {
      const searchQuery = asString(parsed._unknown?.[0])
      return Location_google_find_save(db, searchQuery).then(console.log).catch(console.error)
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

function _getConnectionString() {
  const dbInstance = parsed["db-instance"] || "dev"
  return getConnectionString(dbInstance)
}
