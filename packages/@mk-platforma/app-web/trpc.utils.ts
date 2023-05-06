import { createTRPCReact, type inferReactQueryProcedureOptions } from "@trpc/react-query"
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server"
import { ApiRouter_type } from "./api/api.root"
// infer the types for your router
export type ReactQueryOptions = inferReactQueryProcedureOptions<ApiRouter_type>
export type RouterInputs = inferRouterInputs<ApiRouter_type>
export type RouterOutputs = inferRouterOutputs<ApiRouter_type>
