import { shallowPick, castIf } from "@mk-libs/common/common"
import { PrismaClient } from "@prisma/client"
import { z } from "zod"
import { PersonEndorsementOnly } from "../data/data.types"
import {
  ImageSchema,
  PostSchema,
  Post_asPersonEndorsementSchema,
  Post_categorySchema,
} from "../prisma/generated/zod"
import { publicProcedure } from "../trpc.utils"

const db = new PrismaClient()

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
        }).optional(),
        images: z.array(ImageSchema.shape.id).optional(),
      })
      .refine(input => {
        if (input.categories.some(({ label }) => label === "personEndorsement"))
          return !!input.asPersonEndorsement
        return true
      })
  )
  .mutation(async ({ ctx, input }) => {
    await db.$transaction(async tx => {
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
      if (
        castIf<{ asPersonEndorsement: PersonEndorsementOnly }>(
          input,
          input.categories.some(c => c.label === "personEndorsement")
        )
      ) {
        await tx.post.update({
          where: {
            id: post_created.id,
          },
          data: {
            asPersonEndorsement: {
              create: {
                postId: post_created.id,
                ...shallowPick(input.asPersonEndorsement, "firstName", "lastName", "avatarStyle"),
              },
            },
          },
        })
      }
    })
  })

export default Post_api_create
