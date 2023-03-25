import { z } from 'zod'


export type Category = "job" | "accommodation" | "personEndorsement" | "sellable" | "gathering"

export const allCategories: Category[] = ["job", "accommodation", "personEndorsement", "sellable", "gathering"]

export const Post_base_zod = z.object({
  id: z.number(),
  label: z.string(),
  description: z.string(),
  photos: z.array(z.string()),
  categories: z.array(
    z.enum(["job", "accommodation", "personEndorsement", "sellable", "gathering"])
  ),
})

export type Post_base = z.infer<typeof Post_base_zod>

export const Post_Accommodation_zod = Post_base_zod.extend({
  location: z.string(),
  postAuthor: z.object({
    phoneNumber: z.string()
  }),
  categories: z.array(z.enum(['accommodation'])),
})

export const Post_Gathering_zod = Post_base_zod.extend({
  categories: z.array(z.enum(['gathering'])),
})

export const Post_Job_zod = Post_base_zod.extend({
  categories: z.array(z.enum(['job'])),
})

export const Post_Expert = Post_base_zod.extend({
  endorsedPerson: z.object({
    phoneNumber: z.string(),
    location: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    skills: z.array(z.string()),
    avatarStyle: z.object({}),
  }),
  categories: z.array(z.enum(['personEndorsement'])),
})
