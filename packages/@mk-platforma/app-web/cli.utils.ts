import { spawn, ChildProcess } from "child_process"
import "@mk-libs/common/server-only"

export async function cli_runCommand(command: string, env?: Record<string, string>) {
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

export function cli_getConnectionString(env: string) {
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
