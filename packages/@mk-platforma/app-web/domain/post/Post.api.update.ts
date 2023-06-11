import { shallowPick } from "@mk-libs/common/common"
import { authorizedRoute } from "~/api_/api.server.utils"
import { Post_api_update_input } from "./Post.api.cu.input"
import { getRandomElement } from "@mk-libs/common/array"
import { avatarStyles } from "~/domain/user/User.common"
import "@mk-libs/common/server-only"

const Post_api_update = authorizedRoute(u => u.canMutate && !!u.name)
  .input(Post_api_update_input)
  .mutation(({ ctx, input }) =>
    ctx.db.$transaction(tx =>
      tx.post.update({
        where: {
          id: input.id,
        },
        include: {
          categories: {
            select: {
              label: true,
            },
          },
          expertEndorsement: true,
        },
        data: {
          ...shallowPick(input, "title", "description", "contact"),
          author: {
            connect: {
              id: ctx.user.id,
            },
          },
          images: {
            create: input.images,
          },
          location: {
            connect: input.location || undefined,
          },
          categories: {
            set: input.categories,
          },
          expertEndorsement: input.expertEndorsement
            ? {
                upsert: {
                  create: {
                    post_id: input.id,
                    ...shallowPick(input.expertEndorsement, "firstName", "lastName"),
                    avatarStyle: getRandomElement(avatarStyles),
                    skills: {
                      create: input.expertEndorsement.skills,
                    },
                  },
                  update: {
                    ...shallowPick(input.expertEndorsement, "firstName", "lastName"),
                    // TODO: skills
                  },
                },
              }
            : undefined,
        },
      })
    )
  )

export default Post_api_update
