import { shallowPick } from "@mk-libs/common/common"
import { avatarStyles } from "../data/data.common"
import { publicProcedure } from "../trpc.server.utils"
import { Post_api_create_input } from "./Post.api.cu.input"
import { getRandomElement } from "@mk-libs/common/array"

const Post_api_create = publicProcedure
  .input(Post_api_create_input)
  .mutation(async ({ ctx, input }) => {
    return await ctx.db.$transaction(async tx => {
      const post_created = await tx.post.create({
        data: {
          ...shallowPick(input, "title", "description", "contact"),
          author_id: ctx.userId,
          categories: {
            connect: input.categories,
          },
          images: {
            create: input.images,
          },
          location: {
            connect: input.location,
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
                post_id: post_created.id,
                ...shallowPick(input.asPersonEndorsement, "firstName", "lastName"),
                avatarStyle: getRandomElement(avatarStyles),
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
