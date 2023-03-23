import { z } from 'zod'


export type Category = "job" | "accommodation" | "personEndorsement" | "sellable" | "gathering"

export const allCategories: Category[] = ["job", "accommodation", "personEndorsement", "sellable", "gathering"]

export const Post_base_zod = z.object({
  id: z.number(),
  label: z.string(),
  description: z.string(),
  location: z.string(),
  photos: z.array(z.string()),
  phoneNumber: z.string(),
  categories: z.array(
    z.enum(["job", "accommodation", "personEndorsement", "sellable", "gathering"])
  )
})

export type Post_base = z.infer<typeof Post_base_zod>
