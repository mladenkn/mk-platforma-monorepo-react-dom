import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server"
import type { ApiRouter_type } from "./trpc.router"

export type inferRouterInput = inferRouterInputs<ApiRouter_type>
export type inferRouterOutput = inferRouterOutputs<ApiRouter_type>
