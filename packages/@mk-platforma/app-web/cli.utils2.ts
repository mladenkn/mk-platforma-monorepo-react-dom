import { z } from "zod"

type cli_Context_base = {
  run(cmd: string | string[]): Promise<unknown>
}

export type cli_Command<
  TName extends string = string,
  TContext extends cli_Context_base = cli_Context_base,
  TParams extends object = {},
  TResolveParams = TParams,
> = {
  name: TName
  params?: z.ZodType<TParams>
  resolve:
    | ((c: TContext, params: TResolveParams) => Promise<unknown> | unknown | string)
    | string
    | string[]
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
    const params = command_base.base_params?.and(command.params || z.object({})) as z.ZodType<
      TBase_params & TParams
    >
    async function resolve() {
      // TODO
    }
    return {
      name: command.name,
      resolve,
    }
  }
}

type Command_created = {
  name: string
  resolve(): Promise<unknown>
}

export function cli_run(commands: Command_created[]) {}
