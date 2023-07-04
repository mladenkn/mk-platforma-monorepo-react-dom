import { shallowPick } from "@mk-libs/common/common"
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
      const skills_forUpdate = input.expertEndorsement?.skills?.filter(s => s.id) || []
      for (const skill of skills_forUpdate) {
        await tx.post_ExpertEndorsement_skill.update({
          where: {
            id: skill.id,
          },
          data: {
            label: skill.label,
            level: skill.level,
          },
        })
      }

      await tx.post_ExpertEndorsement_skill.deleteMany({
        where: {
          expertEndorsement: {
            post: {
              id: input.id,
            },
          },
          id: {
            notIn: skills_forUpdate.map(s => s.id!),
          },
        },
      })

      const existingImages = input.images?.filter(i => i.id) || []
      for (const image of existingImages) {
        await tx.image.update({
          where: {
            id: image.id,
          },
          data: image,
        })
      }

      const post = await tx.post.update({
        where: {
          id: input.id,
        },
        include: {
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
            set: existingImages.map(i => ({ id: i.id! })),
            create: input.images?.filter(i => !i.id),
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
                    avatarStyle: getRandomElement(avatarStyles),
                    skills: {
                      create: input.expertEndorsement.skills || undefined, // moraju svi bit bez id-ova
                    },
                    ...shallowPick(input.expertEndorsement, "firstName", "lastName"),
                  },
                  update: {
                    ...shallowPick(input.expertEndorsement, "firstName", "lastName"),
                    skills: {
                      connect:
                        input.expertEndorsement.skills
                          ?.filter(s => s.id)
                          .map(s => ({ id: s.id! })) || [],
                      create: input.expertEndorsement.skills?.filter(s => !s.id),
                    },
                  },
                },
              }
            : undefined,
        },
      })

      return omit(post, "expertEndorsement")
    })
  )

export default Post_api_update
