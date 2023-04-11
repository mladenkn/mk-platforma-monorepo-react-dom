import { z } from "zod"
import { inferOutput } from "../trpc.types"

export type Id = number | string

export const Category_zod = z.enum([
  "job",
  "accommodation",
  "personEndorsement",
  "sellable",
  "gathering",
  "gathering_spirituality",
  "gathering_work",
  "gathering_hangout",
])
export type CategoryLabel = z.infer<typeof Category_zod>

export type Post_base = NonNullable<inferOutput["post"]["single"]>

export type Comment = Post_base["comments"][number]

export type Post_image = NonNullable<Post_base["images"]>[number] & { isMain?: boolean }
