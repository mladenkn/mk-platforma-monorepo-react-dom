import data_seed_fakeRandomized from "./data.seed.fakeRandomized/data.seed.fakeRandomized"
import { cli_command_base, cli_run } from "./cli.utils2"
import { z } from "zod"
import { cli_getConnectionString } from "./cli.utils"
import { location_api_google__search } from "./domain/Location.api.google"
import { asString } from "@mk-libs/common/common"
import drizzle_connect, { Drizzle_instance } from "~/drizzle/drizzle.instance"
import { Api_ss } from "~/api_/api.root"
import { eq } from "drizzle-orm"
import { User } from "~/drizzle/drizzle.schema"

async function api_create(db: Drizzle_instance) {
  const user = await db.query.User.findFirst({ where: eq(User.canMutate, true) }).then(
    u => u || { id: -1, canMutate: false, name: "" },
  )
  const apiContext = { user, getCookie: () => null, db }
  return Api_ss(apiContext)
}

const command = cli_command_base({
  base_params: z.object({
    dbInstance: z.string().optional().default("dev"),
  }),
  async base_resolve({ dbInstance }) {
    const db_connectionString = cli_getConnectionString(dbInstance || "dev")
    process.env.DATABASE_URL = db_connectionString
    return { db_connectionString }
  },
})

const commands = [
  command({ name: "dev", resolve: ({ run }) => run("next dev") }),
  command({ name: "start", resolve: ({ run }) => run("next start") }),
  command({
    name: "db.reset",
    async preResolve({ run }, { dbInstance }) {
      const db_connectionString = cli_getConnectionString(dbInstance || "dev")
      process.env.DATABASE_URL = db_connectionString
      await run(`psql ${db_connectionString} --file=./db.truncate.sql`)
      await run("drizzle-kit push:pg --config=./drizzle/drizzle.config.ts")
    },
    async resolve({ run }) {
      await run("prisma db pull")
      await run("prisma generate")
      console.log("Seeding data")
      await data_seed_fakeRandomized(drizzle_connect())
    },
  }),
  command({
    name: "db.psql",
    async resolve({ db_connectionString, run }) {
      await run(`psql ${db_connectionString}`)
    },
  }),
  command({
    name: "location.many",
    params: z.object({ query: z.string() }),
    resolve: async (_, params) => {
      const api = await api_create(drizzle_connect())
      return api.location.many({ query: params.query }).then(console.log).catch(console.error)
    },
  }),
  command({
    name: "location.google.find",
    params: z.object({ query: z.string() }),
    resolve: (_, { query }) => {
      const searchQuery = asString(query)
      return location_api_google__search(searchQuery)
        .then(r => console.log(r[0]))
        .catch(console.error)
    },
  }),
  // command({
  //   name: "location.google.find.save",
  //   params: z.object({ query: z.string() }),
  //   resolve: ({ db }, { query }) => {
  //     const searchQuery = asString(query)
  //     return Location_google_find_save(db, searchQuery).then(console.log).catch(console.error)
  //   },
  // }),
]

cli_run(commands).then(() => process.exit(0))
