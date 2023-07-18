import commandLineArgs from "command-line-args"
import { spawn, exec } from "child_process"
import { match, P } from "ts-pattern"
import "@mk-libs/common/server-only"

const options = [
  { name: "command", defaultOption: true },
  { name: "db-instance", type: String },
]

export function parseCommand() {
  return commandLineArgs(options, { stopAtFirstUnknown: true })
}

const command_type = P.union(
  P.string,
  P.when(it => typeof it === "function")
)

export async function run(...cmd: unknown[]) {
  const [env, commands] = match(cmd)
    .with([{}, P.array(command_type)], args => [args[0], args[1]])
    .with([{}, command_type], args => [args[0], [args[1]]])
    .with(P.array(command_type), cmd => [{}, cmd])
    .with(command_type, cmd => [{}, [cmd]])
    .run() as [Record<string, string>, (string | (() => void))[]]

  try {
    for (const command of commands) {
      if (typeof command === "function") {
        process.env = { ...env, ...process.env }
        await command()
      } else {
        const result: any = await run_single(command, env)
        if (result.code !== 0) {
          result.error && console.error(result.error?.message || "Error")
          process.exit(result.code)
        }
      }
    }
  } catch (error: any) {
    console.error(`Error ${error?.message}`)
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
    case "preview":
      return "postgres://default:dLkKj9hoY7WT@ep-long-rain-221377-pooler.us-east-1.postgres.vercel-storage.com/verceldb?pgbouncer=true&connect_timeout=15"
    default:
      throw new Error(`Unsupported env: ${env}`)
  }
}
