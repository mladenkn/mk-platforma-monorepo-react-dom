import data_seed_fakeRandomized from "./data.seed.fakeRandomized/data.seed.fakeRandomized"
import { cli_command, cli_command_base, cli_run } from "./cli.utils2"
import { z } from "zod"
import { Drizzle_instance } from "./drizzle/drizzle.instance"
import { Api_ss_type } from "./api_/api.root"

type cli_Context = {
  api: Api_ss_type
  db: Drizzle_instance
  run(cmd: string | string[]): Promise<unknown>
  db_connectionString: string
}

const command = cli_command_base({
  context_params: z.object({ dbInstance: z.string() }),
  async context_create() {
    return null as any as cli_Context
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
