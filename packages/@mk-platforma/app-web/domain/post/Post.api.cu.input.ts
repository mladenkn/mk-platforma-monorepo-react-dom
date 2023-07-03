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
            id: z.number().optional(),
            label: z.string(),
            level: z.number().min(1).max(5).nullish(),
          })
        )
        .nullish(),
    })
    .nullish(),
  images: z
    .array(
      ImageSchema.pick({ url: true, uploadthing_key: true }).extend({ id: z.number().optional() })
    )
    .optional(),
  location: LocationSchema.pick({ id: true }).nullish(),
})

export const Post_api_update_input = Post_api_create_input.extend({
  id: PostSchema.shape.id,
})

export const Post_api_cu_input = Post_api_create_input.or(Post_api_update_input)
