import { Api_ss, Api_ss_type } from "./api_/api.root"
import drizzle_connect, { Drizzle_instance } from "~/drizzle/drizzle.instance"
import { getConnectionString } from "./cli.utils"
import data_seed_fakeRandomized from "./data.seed.fakeRandomized/data.seed.fakeRandomized"

type Params_base = Record<string, string> & { env?: Record<string, string> }

type Context = {
  api: Api_ss_type
  db: Drizzle_instance
  run(cmd: string): Promise<unknown>
}

type Command<
  TName extends string,
  TEnv extends Record<string, string>,
  TParams extends Params_base,
> = {
  name: TName
  params?: TParams
  env?: TEnv
  resolve(c: Context): Promise<unknown> | unknown
}

const commands = [
  {
    name: "dev",
    resolve: ({ run }) => run("next dev"),
  },
  {
    name: "db.reset",
    resolve({ db, run }) {
      run(`psql ${_getConnectionString()} --file=./db.truncate.sql`)
      run("drizzle-kit push:pg --config=./drizzle/drizzle.config.ts")
      run("prisma db pull")
      run("prisma generate")
      data_seed_fakeRandomized(db)
    },
  },
  {
    name: "location.many",
    resolve({ api }) {
      const query = parsed._unknown?.[0] || ""
      return api.location.many({ query }).then(console.log).catch(console.error)
    },
  },
] satisfies Command<string, {}, {}>[]

const parsed = null as any
function _getConnectionString() {
  const dbInstance = parsed["db-instance"] || "dev"
  return getConnectionString(dbInstance)
}
