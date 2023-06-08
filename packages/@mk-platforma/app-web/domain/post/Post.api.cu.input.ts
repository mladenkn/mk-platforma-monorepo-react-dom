import { z } from "zod"
import {
  ImageSchema,
  LocationSchema,
  PostSchema,
  Post_ExpertEndorsementSchema,
  CategorySchema,
} from "~/prisma/generated/zod"

export const Post_api_create_input = PostSchema.pick({
  title: true,
  description: true,
  contact: true,
}).extend({
  categories: z.array(CategorySchema.pick({ id: true })).length(1),
  expertEndorsement: Post_ExpertEndorsementSchema.pick({
    firstName: true,
    lastName: true,
  })
    .extend({
      skills: z
        .array(
          z.object({
            label: z.string(),
            level: z.number().min(1).max(5).nullish(),
          })
        )
        .nullish(),
    })
    .nullish(),
  images: z.array(ImageSchema.pick({ url: true })).optional(),
  location: LocationSchema.pick({ id: true }).nullish(),
})

const create = Post_api_create_input.shape
const create_expert = Post_ExpertEndorsementSchema.shape
export const Post_api_update_input = z.object({
  id: PostSchema.shape.id,
  title: create.title.optional(),
  description: create.title.nullish(),
  contact: create.title.optional(),
  categories: create.categories.optional(),
  images: create.images,
  location: create.location,
  isDeleted: PostSchema.shape.isDeleted.optional(),
  expertEndorsement: z
    .object({
      firstName: create_expert.firstName,
      lastName: create_expert.lastName,
      skills: z
        .array(
          Post_ExpertEndorsement_skillSchema.pick({
            label: true,
            level: true,
          })
        )
        .optional(),
    })
    .nullish(),
})

export const Post_api_cu_input = Post_api_create_input.or(Post_api_update_input)
