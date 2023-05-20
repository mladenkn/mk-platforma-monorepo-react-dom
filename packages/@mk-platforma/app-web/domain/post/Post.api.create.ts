import { shallowPick } from "@mk-libs/common/common"
import { publicProcedure } from "~/api/api.server.utils"
import { Post_api_create_input } from "./Post.api.cu.input"
import { getRandomElement } from "@mk-libs/common/array"
import { avatarStyles } from "~/domain/user/User.common"

const Post_api_create = publicProcedure
  .input(Post_api_create_input)
  .mutation(async ({ ctx, input }) => {
    return await ctx.db.$transaction(async tx => {
      const post_created = await tx.post.create({
        data: {
          ...shallowPick(input, "title", "description", "contact"),
          author: {
            connect: {
              id: ctx.user_id,
            },
          },
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
      if (input.expertEndorsement) {
        await tx.post.update({
          where: {
            id: post_created.id,
          },
          data: {
            expertEndorsement: {
              create: {
                post_id: post_created.id,
                ...shallowPick(input.expertEndorsement, "firstName", "lastName"),
                avatarStyle: getRandomElement(avatarStyles),
                skills: {
                  create: input.expertEndorsement.skills,
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
