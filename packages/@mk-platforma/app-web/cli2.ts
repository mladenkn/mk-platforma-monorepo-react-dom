import data_seed_fakeRandomized from "./data.seed.fakeRandomized/data.seed.fakeRandomized"
import { cli_command, cli_command_base, cli_run } from "./cli.utils2"
import { z } from "zod"
import { cli_createContext, cli_getConnectionString } from "./cli.utils"

const command = cli_command_base({
  context_params: z.object({ dbInstance: z.string().transform(v => v || "dev") }),
  async context_create({ dbInstance }) {
    const base = await cli_createContext()
    const db_connectionString = cli_getConnectionString(dbInstance)
    return { ...base, db_connectionString }
  },
})

const commands = [
  cli_command({ name: "dev", resolve: "next dev" }),
  command({
    name: "db.reset",
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
  command({
    name: "location.many",
    params: z.object({ query: z.string() }),
    resolve: ({ api }, params) =>
      api.location.many({ query: params.query }).then(console.log).catch(console.error), // ovo then(...).catch(...) u utils
  }),
]

cli_run({
  commands: commands as any,
})
