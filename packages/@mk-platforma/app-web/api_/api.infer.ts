import { type inferReactQueryProcedureOptions } from "@trpc/react-query"
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server"
import type { ApiRouter_type } from "~/api_/api.root"

export type ReactQueryOptions = inferReactQueryProcedureOptions<ApiRouter_type>
export type Api_inputs = inferRouterInputs<ApiRouter_type>
export type Api_outputs = inferRouterOutputs<ApiRouter_type>
