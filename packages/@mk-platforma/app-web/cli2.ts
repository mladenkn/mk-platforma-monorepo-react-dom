type Params_base = Record<string, string> & { env?: Record<string, string> }

type Command<
  TName extends string,
  TEnv extends Record<string, string>,
  TParams extends Params_base,
> = {
  name: TName
  params?: TParams
  env?: TEnv
}
