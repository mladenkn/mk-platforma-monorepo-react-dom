import { asNonNil, shallowPick } from "@mk-libs/common/common"
import { authorizedRoute } from "~/api_/api.server.utils"
import { Post_api_create_input } from "./Post.api.cu.input"
import { getRandomElement } from "@mk-libs/common/array"
import { avatarStyles } from "~/domain/user/User.common"
import "@mk-libs/common/server-only"
import { omit } from "lodash"
import { db_drizzle } from "~/drizzle/drizzle.instance"

const allCategories = db_drizzle.query.Category.findMany()

const input = Post_api_create_input.refine(
  async ({ categories, expertEndorsement }) => {
    const _allCategories = await allCategories
    const categories_withLabels = categories.map(post_category =>
      asNonNil(_allCategories.find(c => c.id === post_category.id)),
    )
    if (categories_withLabels.some(c => c.label === "job_demand") && !expertEndorsement)
      return false
    if (categories_withLabels.every(c => c.label !== "job_demand") && expertEndorsement)
      return false
    else return true
  },
  { message: "Category not matched with expertEndorsement field" },
)

const Post_api_create = authorizedRoute(u => u.canMutate && !!u.name)
  .input(input)
  .mutation(({ ctx, input }) =>
    ctx.db.$transaction(
      async tx => {
        for (const image of input.images || []) {
          await tx.image.update({
            where: {
              id: image.id,
            },
            data: {
              isMain: image.isMain,
            },
          })
        }
        const post_upserted = await tx.post.create({
          data: {
            ...shallowPick(input, "title", "description", "contact"),
            author: {
              connect: {
                id: ctx.user.id,
              },
            },
            images: {
              connect: input.images?.map(i => ({ id: i.id })),
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
                  avatarStyle: JSON.stringify(getRandomElement(avatarStyles)),
                  skills: {
                    create: input.expertEndorsement.skills || undefined,
                  },
                },
              },
            },
          })
        }
        return omit(post_upserted, "expertEndorsement")
      },
      { maxWait: 8 * 1000, timeout: 20 * 1000 },
    ),
  )

export default Post_api_create
