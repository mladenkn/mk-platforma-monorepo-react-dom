import { asNonNil, shallowPick } from "@mk-libs/common/common"
import { authorizedRoute } from "~/api_/api.server.utils"
import { Post_api_create_input } from "./Post.api.cu.input"
import { getRandomElement } from "@mk-libs/common/array"
import { avatarStyles } from "~/domain/user/User.common"
import "@mk-libs/common/server-only"
import db_drizzle from "~/drizzle/drizzle.instance"
import {
  CategoryToPost,
  Image,
  Post,
  PostExpertEndorsement,
  PostExpertEndorsementSkill,
} from "~/drizzle/drizzle.schema"
import { eq } from "drizzle-orm"

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
    ctx.db.transaction(async tx => {
      const post_created = await tx
        .insert(Post)
        .values({
          title: input.title,
          description: input.description,
          contact: input.contact,
          author_id: ctx.user.id,
          location_id: input.location?.id,
        })
        .returning()
        .then(r => r[0])

      if (input.categories.length > 0) {
        const categoryToPost_values = input.categories.map(c => ({
          category_id: c.id,
          post_id: post_created.id,
        }))
        await tx.insert(CategoryToPost).values(categoryToPost_values)
      }

      for (const image of input.images || []) {
        await tx
          .update(Image)
          .set({ isMain: image.isMain, url: image.url, post_id: post_created.id })
          .where(eq(Image.id, image.id))
      }

      if (input.expertEndorsement) {
        const post_expertEndorsement_created = await tx
          .insert(PostExpertEndorsement)
          .values({
            ...shallowPick(input.expertEndorsement, "firstName", "lastName"),
            post_id: post_created.id,
            avatarStyle: getRandomElement(avatarStyles),
          })
          .returning()
          .then(r => r[0])

        if (input.expertEndorsement.skills?.length) {
          const post_expertEndorsement_skills_values = input.expertEndorsement.skills.map(s => ({
            expertEndorsementId: post_expertEndorsement_created.id,
            label: s.label,
            level: s.level,
          }))
          await tx.insert(PostExpertEndorsementSkill).values(post_expertEndorsement_skills_values)
        }

        await tx
          .update(Post)
          .set({ expertEndorsementId: post_expertEndorsement_created.id })
          .where(eq(Post.id, post_created.id))
      }

      return post_created
    }),
  )

export default Post_api_create
