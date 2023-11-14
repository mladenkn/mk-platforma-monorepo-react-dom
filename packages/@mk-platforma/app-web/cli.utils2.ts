import { asNonNil } from "@mk-libs/common/common"
import { z } from "zod"
import { cli_runCommand } from "./cli.utils"
import yargs from "yargs"

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
  base_resolve: (params_base: TBase_params) => Promise<TBaseResolve_result>
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
      const base_resolved = await command_base.base_resolve(params_resolved)
      await command.resolve({ ...base_resolved, run: cli_runCommand }, params_resolved)
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
