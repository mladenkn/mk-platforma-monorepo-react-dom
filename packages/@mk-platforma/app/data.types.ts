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

export const Post_base_zod = z.object({
  id: z.number(),
  label: z.string(),
  description: z.string(),
  photos: z.array(z.string()),
  categories: z.array(z.enum(["job", "accommodation", "personEndorsement", "sellable", "gathering", "gathering/spirituality", "gathering/work", "gathering/hangout"])),
})

export type Post_base = z.infer<typeof Post_base_zod>

export type Section = {
  id: number
  label: string
  iconName: Category
  categories: Category[]
}
