import { Api_ss, Api_ss_type } from "./api_/api.root"
import drizzle_connect, { Drizzle_instance } from "~/drizzle/drizzle.instance"

type Params_base = Record<string, string> & { env?: Record<string, string> }

type Context = {
  api: Api_ss_type
  db: Drizzle_instance
  run(cmd: string): Promise<unknown>
}

type Command<
  TName extends string,
  TEnv extends Record<string, string>,
  TParams extends Params_base,
> = {
  name: TName
  params?: TParams
  env?: TEnv
  resolve(c: Context): Promise<unknown> | unknown
}

const commands = [
  {
    name: "dev",
    resolve() {},
  },
  {
    name: "db.reset",
    resolve() {},
  },
  {
    name: "location.many",
    resolve() {},
  },
] satisfies Command<string, {}, {}>[]
