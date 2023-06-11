import { asNonNil, shallowPick } from "@mk-libs/common/common"
import { authorizedRoute } from "~/api_/api.server.utils"
import { Post_api_update_input } from "./Post.api.cu.input"
import { getRandomElement } from "@mk-libs/common/array"
import { avatarStyles } from "~/domain/user/User.common"
import "@mk-libs/common/server-only"
import { omit } from "lodash"

const Post_api_update = authorizedRoute(u => u.canMutate && !!u.name)
  .input(Post_api_update_input)
  .mutation(({ ctx, input }) =>
    ctx.db.$transaction(async tx => {
      const post = await tx.post.update({
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
                  },
                  update: shallowPick(input.expertEndorsement, "firstName", "lastName"),
                },
              }
            : undefined,
        },
      })

      if (input.expertEndorsement?.skills?.length) {
        await tx.post_ExpertEndorsement_skill.deleteMany({
          where: {
            expertEndorsement_id: asNonNil(post.expertEndorsement).id,
          },
        })

        await tx.post_ExpertEndorsement_skill.createMany({
          data: input.expertEndorsement!.skills!.map(s => ({
            label: s.label,
            level: s.level || undefined,
            expertEndorsement_id: asNonNil(post.expertEndorsement).id,
          })),
        })
      }

      return omit(post, "expertEndorsement")
    })
  )

export default Post_api_update
