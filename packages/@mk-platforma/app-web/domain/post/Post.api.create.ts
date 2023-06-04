import { shallowPick } from "@mk-libs/common/common"
import { authorizedRoute } from "~/api_/api.server.utils"
import { Post_api_upsert_input } from "./Post.api.cu.input"
import { getRandomElement } from "@mk-libs/common/array"
import { avatarStyles } from "~/domain/user/User.common"
import "@mk-libs/common/server-only"

const Post_api_create = authorizedRoute(u => u.canMutate && !!u.name)
  .input(Post_api_upsert_input)
  .mutation(async ({ ctx, input }) => {
    return await ctx.db.$transaction(async tx => {
      const data = {
        ...shallowPick(input, "title", "description", "contact"),
        author: {
          connect: {
            id: ctx.user.id,
          },
        },
        categories: {
          connect: input.categories,
        },
        images: {
          create: input.images || undefined,
        },
        location: {
          connect: input.location || undefined,
        },
      }
      const post_created = await tx.post.upsert({
        where: {
          id: input.id || 0,
        },
        update: data,
        create: data,
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
                  create: input.expertEndorsement.skills || undefined,
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
