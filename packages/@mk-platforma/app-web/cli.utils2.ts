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
  ): Command_created<TBase_params & TParams> {
    const merged = {
      name: command.name,
      params: command_base.base_params?.and(command.params || z.object({})) as z.ZodType<
        TBase_params & TParams
      >,
      async resolve(context_base: cli_Context_base, params: z.ZodType<TBase_params & TParams>) {
        // TODO
      },
    }
    return merged
  }
}

type Command_created<Params extends object = {}> = {
  name: string
  params: z.ZodType<Params>
  resolve(context_base: cli_Context_base, params: z.ZodType<Params>): Promise<unknown>
}

type runProgram_options = {
  commands: Command_created[]
}

export function cli_run({ commands }: runProgram_options) {}
