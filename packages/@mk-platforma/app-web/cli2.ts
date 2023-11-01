type Command<
  TEnv extends Record<string, string>,
  TParams extends Record<string, string>,
  TParams_env extends Record<string, string>,
> = {
  env: TEnv
  name: string
  params: TParams
  params_env: TParams
}
