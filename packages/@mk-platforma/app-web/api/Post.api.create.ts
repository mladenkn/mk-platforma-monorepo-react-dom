import { shallowPick, castIf } from "@mk-libs/common/common"
import { Post_category_label, PrismaClient } from "@prisma/client"
import { z } from "zod"
import { PersonEndorsementOnly } from "../data/data.types"
import { publicProcedure } from "../trpc.utils"

const db = new PrismaClient()

const Post_api_create = publicProcedure
  .input(
    z.object({
      title: z.string(),
      description: z.string(),
      contact: z.string(),
      categories: z.array(
        z.object({
          label: z.string(),
        })
      ),
      asPersonEndorsement: z
        .object({
          firstName: z.string(),
          lastName: z.string(),
          avatarStyle: z.object({}),
        })
        .optional(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    await db.$transaction(async tx => {
      const post_created = await tx.post.create({
        data: {
          ...shallowPick(input, "title", "description", "contact"),
          author_id: 1,
          categories: {
            connect: input.categories.map(label => ({
              label: label as any as Post_category_label,
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
