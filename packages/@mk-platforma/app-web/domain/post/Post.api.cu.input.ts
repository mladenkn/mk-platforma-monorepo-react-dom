import { z } from "zod"
import {
  ImageSchema,
  LocationSchema,
  PostSchema,
  Post_ExpertEndorsementSchema,
  CategorySchema,
} from "~/prisma/generated/zod"

export const Post_api_upsert_input = PostSchema.pick({
  title: true,
  description: true,
  contact: true,
}).extend({
  id: PostSchema.shape.id.nullish(),
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
            level: z.number().min(1).max(5),
          })
        )
        .nullish(),
    })
    .nullish(),
  images: z.array(ImageSchema.pick({ url: true })).nullish(),
  location: LocationSchema.pick({ id: true }).nullish(),
})
