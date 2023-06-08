import { shallowPick } from "@mk-libs/common/common"
import { authorizedRoute } from "~/api_/api.server.utils"
import { Post_api_update_input } from "./Post.api.cu.input"
import { getRandomElement } from "@mk-libs/common/array"
import { avatarStyles } from "~/domain/user/User.common"
import "@mk-libs/common/server-only"
import { TRPCError } from "@trpc/server"

const Post_api_update = authorizedRoute(u => u.canMutate && !!u.name)
  .input(Post_api_update_input)
  .mutation(({ ctx, input }) =>
    ctx.db.$transaction(async tx => {
      const post = await tx.post.update({
        where: {
          id: input.id,
        },
        select: {
          categories: {
            select: {
              label: true,
            },
          },
          expertEndorsement: true,
        },
        data: {
          ...shallowPick(input, "title", "description", "contact", "isDeleted"),
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
            connect: input.categories,
          },
          expertEndorsement: input.expertEndorsement
            ? {
                create: {
                  post_id: input.id,
                  ...shallowPick(input.expertEndorsement, "firstName", "lastName"),
                  avatarStyle: getRandomElement(avatarStyles),
                  skills: {
                    create: input.expertEndorsement.skills,
                  },
                },
              }
            : undefined,
        },
      })
      const isValid = post.categories.every(
        c =>
          (c.label === "job_demand" && post.expertEndorsement) ||
          (c.label !== "job_demand" && !post.expertEndorsement)
      )
      if (!isValid) throw new TRPCError({ code: "BAD_REQUEST" })
    })
  )

export default Post_api_update
