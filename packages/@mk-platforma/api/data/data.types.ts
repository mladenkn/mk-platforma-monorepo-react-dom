import { z } from "zod"

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
  id: number
  content: string
  author: {
    firstName: string
    lastName: string
    avatarStyle: Record<string, string>
  }
}

export type Post_base = {
  id: number
  label: string
  description: string
  photos: string[]
  categories: Category[]
  location?: string
  mainImage?: string
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
