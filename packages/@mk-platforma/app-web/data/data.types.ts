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

export type Category = {
  id: number
  label: CategoryLabel
  parent?: Category
}

export type Post_base = NonNullable<inferOutput["post"]["single"]>

export type Comment = Post_base["comments"][number]

export type Post_image = NonNullable<Post_base["images"]>[number] & { isMain?: boolean }

export type Post_expert = Post_base & {
  categories:
    | ["personEndorsement"]
    | ["personEndorsement", CategoryLabel]
    | ["personEndorsement", CategoryLabel, CategoryLabel]
  asPersonEndorsement: PersonEndorsementOnly
}

export type PersonEndorsementOnly = {
  firstName: string
  lastName: string
  skills: {
    label: string
    level: 1 | 2 | 3 | 4 | 5
  }[]
  avatarStyle: Record<string, string>
}
