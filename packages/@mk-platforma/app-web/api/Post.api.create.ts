import { shallowPick, castIf } from "@mk-libs/common/common"
import { PrismaClient } from "@prisma/client"
import { z } from "zod"
import { PersonEndorsementOnly } from "../data/data.types"
import {
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
    }).extend({
      categories: z.array(Post_categorySchema.pick({ label: true })),
      asPersonEndorsement: Post_asPersonEndorsementSchema.pick({
        firstName: true,
        lastName: true,
        avatarStyle: true,
      }).optional(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    await db.$transaction(async tx => {
      const post_created = await tx.post.create({
        data: {
          ...shallowPick(input, "title", "description", "contact"),
          author_id: 1,
          categories: {
            connect: input.categories.map(({ label }) => ({
              label,
            })),
          },
        },
        include: {
          categories: true,
        },
      })
      if (
        castIf<{ asPersonEndorsement: PersonEndorsementOnly }>(
          input,
          (input.categories as any).includes("personEndorsement")
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
