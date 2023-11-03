import { Api_ss_type } from "./api_/api.root"
import { Drizzle_instance } from "~/drizzle/drizzle.instance"
import { z } from "zod"

export type cli_Context = {
  api: Api_ss_type
  db: Drizzle_instance
  run(cmd: string | string[]): Promise<unknown>
  db_connectionString: string
}

export type cli_Command<
  TName extends string = string,
  TEnv extends Record<string, string> = {},
  TParams extends object = {},
  TResolveParams = TParams,
> = {
  name: TName
  params?: z.ZodType<TParams>
  env?: TEnv | ((c: cli_Context, params: TResolveParams) => TEnv)
  resolve:
    | ((c: cli_Context, params: TResolveParams) => Promise<unknown> | unknown | string)
    | string
    | string[]
}

export function cli_command_base<
  TEnv_base extends Record<string, string>,
  TParams_base extends object = {},
>(command_base: {
  params?: z.ZodType<TParams_base>
  env?: TEnv_base | ((c: cli_Context, params: TParams_base) => TEnv_base)
}) {
  return function cli_command<
    TName extends string = string,
    TEnv extends Record<string, string> = {},
    TParams extends object = {},
  >(command: cli_Command<TName, TEnv, TParams, TParams & TParams_base>) {
    const merged = {
      name: command.name,
      resolve: command.resolve,
      params: command_base.params?.and(command.params || z.object({})),
      env: {
        ...command_base.env,
        ...command.env,
      },
    }
    return merged as cli_Command<TName, TEnv & TEnv_base, TParams & TParams_base>
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
