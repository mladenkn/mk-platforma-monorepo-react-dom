import commandLineArgs from "command-line-args"
import { spawn, exec } from "child_process"
import { match, P } from "ts-pattern"
import "@mk-libs/common/server-only"
import { Api_ss, Api_ss_type } from "./api_/api.root"
import drizzle_connect from "~/drizzle/drizzle.instance"
import { eq } from "drizzle-orm"
import { User } from "~/domain/user/User.schema"
import { asNonNil } from "@mk-libs/common/common"
import { isArray } from "lodash"
import { Api_context } from "./api_/api.server.utils"

const options = [
  { name: "command", defaultOption: true },
  { name: "db-instance", type: String },
]

export function parseCommand() {
  return commandLineArgs(options, { stopAtFirstUnknown: true })
}

export type Cli_Context = {
  api: Api_ss_type
  apiContext: Api_context
}

export type Cli_run_EnvVars = Record<string, string>

type Command_function = (c: Cli_Context) => void | Promise<unknown>
export type Cli_run_Command = Command_function | string

type Commands = Cli_run_Command | Cli_run_Command[]

export function run(env: Cli_run_EnvVars, commands: Commands): Promise<unknown>
export function run(commands: Commands): Promise<unknown>

export async function run(...cmd: unknown[]) {
  const [env, commandOrCommands] = match(cmd)
    .with([{}, P.any], it => it)
    .with([P.any], it => [{}, it[0]])
    .run() as [Cli_run_EnvVars, Cli_run_Command | Cli_run_Command[]]

  const commands: Cli_run_Command[] = isArray(commandOrCommands)
    ? commandOrCommands
    : [commandOrCommands]

  const db = drizzle_connect()

  const user = await db.query.User.findFirst({ where: eq(User.canMutate, true) }).then(asNonNil)
  const apiContext = { user: user, getCookie: () => null, db }
  const api = Api_ss(apiContext)
  const cliContext = { apiContext, api }

  try {
    for (const command of commands) {
      if (typeof command === "function") {
        process.env = { ...env, ...process.env }
        await command(cliContext)
      } else {
        const result: any = await run_single(command, env)
        if (result.code !== 0) {
          result.error && console.error(result.error?.message || "Error")
          process.exit(result.code)
        }
      }
    }
  } catch (error: any) {
    console.error(error)
    process.exit(1)
  }
}

function run_single(command: string, env: Record<string, string>) {
  if (command.startsWith("pnpm exec ts-node")) return run_withExec(command, env)
  else return run_withSpawn(command, env)
}

function run_withSpawn(command: string, env: Record<string, string>) {
  const command_words = command.split(" ")
  const cmd = spawn(command_words[0], command_words.slice(1), {
    env: { ...process.env, ...env },
    stdio: command_words[0] === "psql" ? "inherit" : undefined,
  })
  return new Promise((resolve, reject) => {
    cmd.stdout?.on?.("data", data => process.stdout.write(data.toString()))
    cmd.stderr?.on?.("data", data => process.stderr.write(data.toString()))
    cmd.on?.("error", error => {
      reject({ error, code: -1 })
      process.stderr.write(error.message)
    })
    cmd.on?.("close", code => resolve({ code }))
  })
}

function run_withExec(command: string, env: Record<string, string>) {
  const command_ = `${objectToEnvString(env)} ${command}`
  return new Promise((resolve, reject) => {
    exec(command_, (error, stdout, stderr) => {
      if (error) {
        console.error(error)
        reject({ error, code: -1 })
      }
      console.log(stdout ? stdout : stderr)
      resolve({ code: 1 })
    })
  })
}

function objectToEnvString(obj: Record<string, string>) {
  return Object.entries(obj)
    .map(([key, value]) => `${key}=${value}`)
    .join(" ")
}

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
      return "postgres://mladenkn:EWT4n5pMetaB@ep-shy-paper-831120.eu-central-1.aws.neon.tech/neondb"
    case "neon-staging":
      return "postgres://mladenkn:EWT4n5pMetaB@ep-lingering-fog-424091.eu-central-1.aws.neon.tech/neondb"
    default:
      throw new Error(`Unsupported env: ${env}`)
  }
}
