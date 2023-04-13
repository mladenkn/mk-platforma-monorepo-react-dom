import { shallowPick } from "@mk-libs/common/common"
import { z } from "zod"
import {
  ImageSchema,
  PostSchema,
  Post_asPersonEndorsementSchema,
  Post_asPersonEndorsement_skillSchema,
  Post_categorySchema,
} from "../prisma/generated/zod"
import db from "../prisma/instance"
import { publicProcedure } from "../trpc.utils"

const Post_api_create = publicProcedure
  .input(
    PostSchema.pick({
      title: true,
      description: true,
      contact: true,
      location_id: true,
    })
      .extend({
        categories: z.array(Post_categorySchema.pick({ label: true })),
        asPersonEndorsement: Post_asPersonEndorsementSchema.pick({
          firstName: true,
          lastName: true,
          avatarStyle: true,
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
        images: z.array(ImageSchema.shape.id).optional(),
      })
      .refine(input => {
        if (input.categories.some(({ label }) => label === "personEndorsement"))
          return !!input.asPersonEndorsement
        return true
      })
  )
  .mutation(async ({ ctx, input }) => {
    return await db.$transaction(async tx => {
      const post_created = await tx.post.create({
        data: {
          ...shallowPick(input, "title", "description", "contact", "location_id"),
          author_id: 1,
          categories: {
            connect: input.categories,
          },
          images: {
            connect: input.images?.map(id => ({ id })),
          },
        },
      })
      if (input.asPersonEndorsement) {
        await tx.post.update({
          where: {
            id: post_created.id,
          },
          data: {
            asPersonEndorsement: {
              create: {
                postId: post_created.id,
                ...shallowPick(input.asPersonEndorsement, "firstName", "lastName", "avatarStyle"),
                skills: {
                  create: input.asPersonEndorsement.skills,
                },
              },
            },
          },
        })
      }
      return post_created
    })
  })

export default Post_api_create
