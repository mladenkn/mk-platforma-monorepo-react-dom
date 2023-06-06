import { z } from "zod"
import {
  ImageSchema,
  LocationSchema,
  PostSchema,
  Post_ExpertEndorsementSchema,
  Post_ExpertEndorsement_skillSchema,
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
          Post_ExpertEndorsement_skillSchema.pick({
            label: true,
            level: true,
          })
        )
        .nullish(),
    })
    .nullish(),
  images: z.array(ImageSchema.pick({ url: true })).nullish(),
  location: LocationSchema.pick({ id: true }).nullish(),
})
