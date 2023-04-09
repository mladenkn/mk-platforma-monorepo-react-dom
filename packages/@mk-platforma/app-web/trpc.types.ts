import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server"
import type { ApiRouter_type } from "./trpc.router"

type inferRouterInput = inferRouterInputs<ApiRouter_type>
type inferRouterOutput = inferRouterOutputs<ApiRouter_type>
