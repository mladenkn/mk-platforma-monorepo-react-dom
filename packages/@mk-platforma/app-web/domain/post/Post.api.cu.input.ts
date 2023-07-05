import { z } from "zod"
import { ImageSchema, LocationSchema, PostSchema, CategorySchema } from "~/prisma/generated/zod"

export const Post_api_create_input = z
  .object({
    title: z.string().min(1),
    description: z.string().min(1),
    contact: z.string().min(1),
  })
  .extend({
    categories: z.array(CategorySchema.pick({ id: true })).length(1),
    expertEndorsement: z
      .object({
        firstName: z.string().min(1),
        lastName: z.string().min(1),
      })
      .extend({
        skills: z
          .array(
            z.object({
              id: z.number().optional(),
              label: z.string().min(1),
              level: z.number().min(1).max(5).nullish(),
            })
          )
          .nullish(),
      })
      .nullish(),
    images: z
      .array(ImageSchema.pick({ isMain: true, id: true, url: true }))
      .optional()
      .refine(images => (images?.length ? images?.filter(i => i.isMain).length === 1 : true), {
        message: "Mora biti jedna glavna slika",
        params: {
          code: "ONE_MAIN_IMAGE",
        },
      }),
    location: LocationSchema.pick({ id: true }).nullish(),
  })

export const Post_api_update_input = Post_api_create_input.extend({
  id: PostSchema.shape.id,
})

export const Post_api_cu_input = Post_api_create_input.or(Post_api_update_input)
