import { z } from "zod"
import {
  ImageSchema,
  LocationSchema,
  PostSchema,
  Post_ExpertEndorsementSchema,
  Post_ExpertEndorsement_skillSchema,
  CategorySchema,
} from "~/prisma/generated/zod"

export const Post_api_cu_input_base = PostSchema.pick({
  title: true,
  description: true,
  contact: true,
}).extend({
  categories: z.array(CategorySchema.pick({ id: true })),
  expertEndorsement: Post_ExpertEndorsementSchema.pick({
    firstName: true,
    lastName: true,
  })
    .extend({
      skills: z
        .array(
          Post_ExpertEndorsement_skillSchema.pick({
            label: true,
            level: true,
          })
        )
        .optional(),
    })
    .optional(),
  images: z.array(ImageSchema.pick({ url: true })).optional(),
  location: LocationSchema.pick({ id: true }),
})

export const Post_api_create_input = Post_api_cu_input_base

export const Post_api_update_input = Post_api_cu_input_base
