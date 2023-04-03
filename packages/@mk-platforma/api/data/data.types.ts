import { z } from "zod"

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
    firstName: string
    lastName: string
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

export type Post_base = {
  id: Id
  label: string
  description: string
  categories: Category[]
  images?: Post_image[]
  location?: string
  comments?: Comment[]
}

export type Post_expert = Post_base & {
  categories:
    | ["personEndorsement"]
    | ["personEndorsement", Category]
    | ["personEndorsement", Category, Category]
  firstName: string
  lastName: string
  skills: string[]
  avatarStyle: Record<string, string>
}
