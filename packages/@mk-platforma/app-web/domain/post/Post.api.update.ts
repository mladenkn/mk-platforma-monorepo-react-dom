import { shallowPick } from "@mk-libs/common/common"
import { authorizedRoute } from "~/api_/api.server.utils"
import { Post_api_update_input } from "./Post.api.cu.input"
import { getRandomElement } from "@mk-libs/common/array"
import { avatarStyles } from "~/domain/user/User.common"
import "@mk-libs/common/server-only"

const input = Post_api_update_input.refine(
  async ({ categories, expertEndorsement }) => {
    // TODO: check categories
  },
  { message: "Category not matched with expertEndorsement field" }
)

const Post_api_update = authorizedRoute(u => u.canMutate && !!u.name)
  .input(input)
  .mutation(({ ctx, input }) =>
    ctx.db.post.update({
      where: {
        id: input.id,
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
  )

export default Post_api_update
