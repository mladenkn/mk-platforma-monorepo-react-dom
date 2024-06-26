import { asNonNil } from "@mk-libs/common/common"
import { z } from "zod"
import yargs from "yargs"
import { spawn, ChildProcess } from "child_process"
import "@mk-libs/common/server-only"

type cli_Context_base = {
  run(cmd: string): Promise<unknown>
}

export type cli_Command<
  TName extends string = string,
  TContext extends cli_Context_base = cli_Context_base,
  TParams extends object = {},
  TResolveParams = TParams,
> = {
  name: TName
  params?: z.ZodType<TParams>
  resolve: (c: TContext, params: TResolveParams) => Promise<unknown>
}

export function cli_command_base<
  TBase_params extends object = {},
  TBaseResolve_result extends object = {},
>(command_base: {
  base_params?: z.ZodType<TBase_params>
  // base_resolve: (params_base: TBase_params) => Promise<TBaseResolve_result>
}) {
  return function cli_command<TName extends string = string, TParams extends object = {}>(
    command: cli_Command<
      TName,
      TBaseResolve_result & cli_Context_base,
      TParams,
      TParams & TBase_params
    >,
  ): Command_created {
    const params_zod = command_base.base_params?.and(command.params || z.object({})) as z.ZodType<
      TBase_params & TParams
    >
    async function resolve() {
      const params_resolved = params_zod.parse(yargs.argv)
      // const base_resolved = await command_base.base_resolve(params_resolved)
      await command.resolve({ run: cli_runCommand } as any, params_resolved)
    }
    return { name: command.name, resolve }
  }
}

type Command_created = {
  name: string
  resolve(): Promise<unknown>
}

export function cli_run(commands: Command_created[]) {
  const command_name = asNonNil(process.argv[2])
  const command = commands.find(c => c.name === command_name)
  if (!command) {
    throw new Error(`Command with name ${command_name} not registered.`)
  }
  return command.resolve()
}

async function cli_runCommand(command: string, env?: Record<string, string>) {
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
