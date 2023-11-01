import data_seed_fakeRandomized from "./data.seed.fakeRandomized/data.seed.fakeRandomized"
import { cli_Command, cli_run } from "./cli.utils2"
import { z } from "zod"
import { getConnectionString } from "./cli.utils"

const commands: cli_Command<string, {}>[] = [
  { name: "dev", resolve: "next dev" },
  {
    name: "db.reset",
    async resolve({ db, db_connectionString, run }) {
      await run(`psql ${db_connectionString} --file=./db.truncate.sql`)
      await run("drizzle-kit push:pg --config=./drizzle/drizzle.config.ts")
      await run("prisma db pull")
      await run("prisma generate")
      await data_seed_fakeRandomized(db)
    },
  },
  {
    name: "location.many",
    params: z.object({ query: z.string() }),
    resolve: ({ api, params }) =>
      api.location.many({ query: params.query }).then(console.log).catch(console.error),
  },
]

cli_run({
  commands,
  env_base: { DATABASE_URL: getConnectionString("dev") },
  env_userInjected: { DATABASE_URL: { fromParam: "db-instance", map: getConnectionString } },
})
