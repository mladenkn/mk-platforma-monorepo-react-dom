import { z } from "zod"

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
  TContext_params extends object = {},
>(command_base: {
  context_params?: z.ZodType<TContext_params>
  context_create: (params_base: TContext_params) => Promise<TContext>
}) {
  return function cli_command<TName extends string = string, TParams extends object = {}>(
    command: cli_Command<TName, TContext, TParams, TParams & TContext_params>,
  ) {
    const merged = {
      name: command.name,
      resolve: command.resolve,
      params: command_base.context_params?.and(command.params || z.object({})),
    }
    return merged as cli_Command<TName, TContext, TParams & TContext_params>
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
