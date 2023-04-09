import { z } from "zod"
import { inferOutput } from "../trpc.types"

export type Id = number | string

export const Category_zod = z.enum([
  "job",
  "accommodation",
  "personEndorsement",
  "sellable",
  "gathering",
  "gathering/spirituality",
  "gathering/work",
  "gathering/hangout",
])
export type Category = z.infer<typeof Category_zod>

export type Comment = {
  id: Id
  content: string
  author: {
    userName: string
    avatarStyle: Record<string, string>
  }
  canEdit: boolean
  canDelete: boolean
}

export type Post_image = {
  id: Id
  url: string
  isMain: boolean
}

export type Post_base = inferOutput["post"]["single"]

export type Post_expert = Post_base & {
  categories:
    | ["personEndorsement"]
    | ["personEndorsement", Category]
    | ["personEndorsement", Category, Category]
  firstName: string
  lastName: string
  skills: {
    label: string
    level: 1 | 2 | 3 | 4 | 5
  }[]
  avatarStyle: Record<string, string>
}
