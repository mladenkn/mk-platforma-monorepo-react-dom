import { z } from "zod"

export type Category =
  | "job"
  | "accommodation"
  | "personEndorsement"
  | "sellable"
  | "gathering"
  | "gathering/spirituality"
  | "gathering/work"
  | "gathering/hangout"

export const allCategories: Category[] = [
  "job",
  "accommodation",
  "personEndorsement",
  "sellable",
  "gathering",
  "gathering/spirituality",
  "gathering/work",
  "gathering/hangout",
]

export const Category_zod = z.enum(["job", "accommodation", "personEndorsement", "sellable", "gathering", "gathering/spirituality", "gathering/work", "gathering/hangout"])

export const Post_base_zod = z.object({
  id: z.number(),
  label: z.string(),
  description: z.string(),
  photos: z.array(z.string()),
  categories: z.array(Category_zod),
  location: z.string().optional(),
})

export type Post_base = z.infer<typeof Post_base_zod>

export type Post_expert = Post_base & {
  categories: ["personEndorsement"] | ["personEndorsement", Category] | ["personEndorsement", Category, Category]
  firstName: string
  lastName: string
  skills: string[]
  avatarStyles: Record<string, string>
}
