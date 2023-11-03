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
  ) {
    const merged: cli_Command<
      TName,
      TBaseResolve_result & cli_Context_base,
      TParams & TBase_params
    > = {
      name: command.name,
      resolve: command.resolve, // TODO: wrapat sa base_resolve
      params: command_base.base_params?.and(command.params || z.object({})) as z.ZodType<
        TParams & TBase_params
      >,
    }
    return merged
  }
}

type ResolveNoContext<TParams> =
  | ((params: TParams) => Promise<unknown> | unknown | string)
  | string
  | string[]

export function cli_command<TName extends string = string, TParams extends object = {}>(
  command: cli_Command<TName, cli_Context_base, TParams> & { resolve: ResolveNoContext<TParams> },
) {
  return command
}

type runProgram_options = {
  commands: cli_Command[]
}

export function cli_run({ commands }: runProgram_options) {}
