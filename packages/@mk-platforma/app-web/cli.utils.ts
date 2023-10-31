import commandLineArgs from "command-line-args"
import { spawn, ChildProcess } from "child_process"
import { match, P } from "ts-pattern"
import "@mk-libs/common/server-only"
import { Api_ss, Api_ss_type } from "./api_/api.root"
import drizzle_connect from "~/drizzle/drizzle.instance"
import { eq } from "drizzle-orm"
import { User } from "~/domain/user/User.schema"
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

  const parsed = parseCommand()
  const dbInstance = parsed["db-instance"] || "dev"
  const DATABASE_URL = getConnectionString(dbInstance)

  process.env = { ...process.env, DATABASE_URL, ...env }

  async function createContext() {
    const db = drizzle_connect()

    const user = await db.query.User.findFirst({ where: eq(User.canMutate, true) }).then(
      u => u || { id: -1, canMutate: false, name: "" },
    )
    const apiContext = { user, getCookie: () => null, db }
    return { apiContext, api: Api_ss(apiContext) }
  }

  try {
    for (const command of commands) {
      if (typeof command === "function") {
        await command(await createContext())
      } else {
        const result: any = await runCommand(command, env)
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

async function runCommand(command: string, env: Record<string, string>) {
  return new Promise((resolve, reject) => {
    const [cmd, ...args] = command.split(" ")

    const childProcess: ChildProcess = spawn(cmd, args, {
      env: { ...process.env, ...env },
      stdio: "inherit",
    })

    if (process.stdin && childProcess.stdin) process.stdin.pipe(childProcess.stdin!)

    childProcess.stdout?.on("data", data => {
      console.log(data.toString())
    })

    childProcess.stderr?.on("data", data => {
      console.error(data.toString())
    })

    childProcess.on("close", code => {
      resolve({ code })
    })

    childProcess.on("error", error => {
      reject({ error, code: -1 })
    })
  })
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
      return "postgres://mladenkn:EWT4n5pMetaB@ep-shy-paper-831120.eu-central-1.aws.neon.tech/neondb?sslmode=require"
    case "neon-staging":
      return "postgres://mladenkn:EWT4n5pMetaB@ep-lingering-fog-424091.eu-central-1.aws.neon.tech/neondb?sslmode=require"
    default:
      throw new Error(`Unsupported env: ${env}`)
  }
}
