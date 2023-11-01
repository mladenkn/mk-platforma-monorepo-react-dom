import commandLineArgs from "command-line-args"
import { Api_ss, Api_ss_type } from "./api_/api.root"
import drizzle_connect, { Drizzle_instance } from "~/drizzle/drizzle.instance"
import { z } from "zod"
import { eq } from "drizzle-orm"
import { User } from "./domain/user/User.schema"

export type Context = {
  api: Api_ss_type
  db: Drizzle_instance
  run(cmd: string): Promise<unknown>
}

export type Command<
  TName extends string,
  TEnv extends Record<string, string>,
  TParamsZod extends z.AnyZodObject = z.AnyZodObject,
> = {
  name: TName
  params?: TParamsZod
  env?: TEnv
  resolve:
    | ((c: Context & { params: z.infer<TParamsZod> }) => Promise<unknown> | unknown | string)
    | string
}

type runProgram_options = {
  commands: Command<string, {}>[]
  env: Record<string, string>
}

export function runProgram({ commands }: runProgram_options) {}

export function getConnectionString(env: string) {
  switch (env) {
    case "dev":
      return "postgresql://postgres:postgres@localhost:5432/za_brata"
    case "test.local":
      return "postgresql://postgres:postgres@localhost:5432/za_brata_test"
    case "staging":
      return "postgresql://postgres:E18xcmX5bA2y8pPu85KF@containers-us-west-116.railway.app:7999/railway"
    case "prod":
      return "postgres://default:dLkKj9hoY7WT@ep-long-rain-221377-pooler.us-east-1.postgres.vercel-storage.com/verceldb?pgbouncer=true&connect_timeout=15"
    case "neon-main": // ovo je na vercelu
      return "postgres://mladenkn:EWT4n5pMetaB@ep-shy-paper-831120.eu-central-1.aws.neon.tech/neondb?sslmode=require"
    case "neon-staging":
      return "postgres://mladenkn:EWT4n5pMetaB@ep-lingering-fog-424091.eu-central-1.aws.neon.tech/neondb?sslmode=require"
    default:
      throw new Error(`Unsupported env: ${env}`)
  }
}

export function getConnectionString_cli() {
  const options = [
    { name: "command", defaultOption: true },
    { name: "db-instance", type: String },
  ]
  const parsed = commandLineArgs(options, { stopAtFirstUnknown: true })
  const dbInstance = parsed["db-instance"] || "dev"
  return getConnectionString(dbInstance)
}

async function createContext() {
  const db = drizzle_connect()

  const user = await db.query.User.findFirst({ where: eq(User.canMutate, true) }).then(
    u => u || { id: -1, canMutate: false, name: "" },
  )
  const apiContext = { user, getCookie: () => null, db }
  return { db, api: Api_ss(apiContext) }
}
