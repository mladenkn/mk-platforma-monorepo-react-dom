import { z } from "zod"
import {
  ImageSchema,
  PostSchema,
  Post_asPersonEndorsementSchema,
  Post_asPersonEndorsement_skillSchema,
  Post_categorySchema,
} from "../prisma/generated/zod"

export const Post_api_cu_input_base = PostSchema.pick({
  title: true,
  description: true,
  contact: true,
  location_id: true,
}).extend({
  categories: z.array(Post_categorySchema.pick({ label: true })),
  asPersonEndorsement: Post_asPersonEndorsementSchema.pick({
    firstName: true,
    lastName: true,
  })
    .extend({
      skills: z
        .array(
          Post_asPersonEndorsement_skillSchema.pick({
            label: true,
            level: true,
          })
        )
        .optional(),
    })
    .optional(),
  images: z.array(ImageSchema.pick({ url: true })).optional(),
})

export const Post_api_create_input = Post_api_cu_input_base

export const Post_api_update_input = Post_api_cu_input_base
