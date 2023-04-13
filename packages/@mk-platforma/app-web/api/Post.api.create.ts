import { shallowPick } from "@mk-libs/common/common"
import { publicProcedure } from "../trpc.server.utils"
import { Post_api_create_input } from "./Post.api.cu.input"

const Post_api_create = publicProcedure
  .input(Post_api_create_input)
  .mutation(async ({ ctx, input }) => {
    return await ctx.db.$transaction(async tx => {
      const post_created = await tx.post.create({
        data: {
          ...shallowPick(input, "title", "description", "contact", "location_id"),
          author_id: ctx.userId,
          categories: {
            connect: input.categories,
          },
          images: {
            connect: input.images?.map(id => ({ id })),
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
                ...shallowPick(input.asPersonEndorsement, "firstName", "lastName", "avatarStyle"),
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
