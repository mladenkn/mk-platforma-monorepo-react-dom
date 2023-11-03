import data_seed_fakeRandomized from "./data.seed.fakeRandomized/data.seed.fakeRandomized"
import { cli_Command, cli_command, cli_run } from "./cli.utils2"
import { z } from "zod"
import { getConnectionString } from "./cli.utils"

const commands = [
  cli_command({ name: "dev", resolve: "next dev" }),
  cli_command({
    name: "db.reset",
    params: z.object({ query: z.string() }),
    async resolve({ db, db_connectionString, run }) {
      await run([
        `psql ${db_connectionString} --file=./db.truncate.sql`,
        "drizzle-kit push:pg --config=./drizzle/drizzle.config.ts",
        "prisma db pull",
        "prisma generate",
      ])
      await data_seed_fakeRandomized(db)
    },
  }),
  cli_command({
    name: "location.many",
    params: z.object({ query: z.string() }),
    resolve: ({ api }, { query }) =>
      api.location.many({ query }).then(console.log).catch(console.error), // ovo then(...).catch(...) u utils
  }),
]

cli_run({
  commands: commands as any,
  env_base: { DATABASE_URL: getConnectionString("dev") },
  env_userInjected: { DATABASE_URL: { fromParam: "db-instance", map: getConnectionString } },
})
