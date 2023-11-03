import { z } from "zod"

type cli_Context_base = {
  run(cmd: string | string[]): Promise<unknown>
}

export type cli_Command<
  TName extends string = string,
  TContext extends object = {},
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
  TContext extends object = {},
  TBase_params extends object = {},
>(command_base: {
  context_params?: z.ZodType<TBase_params>
  context_create: (params_base: TBase_params) => Promise<TContext>
}) {
  return function cli_command<TName extends string = string, TParams extends object = {}>(
    command: cli_Command<TName, TContext & cli_Context_base, TParams, TParams & TBase_params>,
  ) {
    const merged: cli_Command<TName, TContext & cli_Context_base, TParams & TBase_params> = {
      name: command.name,
      resolve: command.resolve,
      params: command_base.context_params?.and(command.params || z.object({})) as z.ZodType<
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

export function cli_command<
  TName extends string = string,
  TEnv extends Record<string, string> = {},
  TParams extends object = {},
>(command: cli_Command<TName, TEnv, TParams> & { resolve: ResolveNoContext<TParams> }) {
  return command
}

type runProgram_options = {
  commands: cli_Command[]
}

export function cli_run({ commands }: runProgram_options) {}
