import { z } from "zod"
import { inferOutput } from "./trpc.types"

export type Id = number | string

export type Post_base = NonNullable<inferOutput["post"]["single"]>
