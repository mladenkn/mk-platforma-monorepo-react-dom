import { asNonNil, shallowPick } from "@mk-libs/common/common"
import { authorizedRoute } from "~/api_/api.server.utils"
import { Post_api_create_input } from "./Post.api.cu.input"
import { getRandomElement } from "@mk-libs/common/array"
import { avatarStyles } from "~/domain/user/User.common"
import "@mk-libs/common/server-only"
import db from "~/prisma/instance"

const allCategories = db.category.findMany()

const input = Post_api_create_input.refine(
  async ({ categories, expertEndorsement }) => {
    const _allCategories = await allCategories
    const categories_withLabels = categories.map(post_category =>
      asNonNil(_allCategories.find(c => c.id === post_category.id))
    )
    return categories_withLabels.every(
      c =>
        (c.label === "job_demand" && expertEndorsement) ||
        (c.label !== "job_demand" && !expertEndorsement)
    )
  },
  { message: "Category not matched with expertEndorsement field" }
)

const Post_api_create = authorizedRoute(u => u.canMutate && !!u.name)
  .input(input)
  .mutation(async ({ ctx, input }) => {
    return await ctx.db.$transaction(async tx => {
      const post_upserted = await tx.post.create({
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
        },
      })
      if (input.expertEndorsement) {
        await tx.post.update({
          where: {
            id: post_upserted.id,
          },
          data: {
            expertEndorsement: {
              create: {
                post_id: post_upserted.id,
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
      return post_upserted
    })
  })

export default Post_api_create
