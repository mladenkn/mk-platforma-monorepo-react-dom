import data_seed_fakeRandomized from "./data.seed.fakeRandomized/data.seed.fakeRandomized"
import { Command, getConnectionString_cli, runProgram } from "./cli.utils2"
import { z } from "zod"

const commands: Command<string, {}>[] = [
  {
    name: "dev",
    resolve: "next dev",
  },
  {
    name: "db.reset",
    async resolve({ db, run }) {
      await run(`psql ${getConnectionString_cli()} --file=./db.truncate.sql`)
      await run("drizzle-kit push:pg --config=./drizzle/drizzle.config.ts")
      await run("prisma db pull")
      await run("prisma generate")
      await data_seed_fakeRandomized(db)
    },
  },
  {
    name: "location.many",
    params: z.object({ query: z.string() }),
    resolve({ api, params }) {
      return api.location.many({ query: params.query }).then(console.log).catch(console.error)
    },
  },
]

runProgram({ commands, env: { DATABASE_URL: getConnectionString_cli() } })
