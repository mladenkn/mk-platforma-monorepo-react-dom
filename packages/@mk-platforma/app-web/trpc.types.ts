import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server"
import type { ApiRouter_type } from "./trpc.router"

export type inferInput = inferRouterInputs<ApiRouter_type>
export type inferOutput = inferRouterOutputs<ApiRouter_type>
