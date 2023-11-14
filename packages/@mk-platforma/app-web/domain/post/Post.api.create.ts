import { shallowPick } from "@mk-libs/common/common"
import { Post_api_create_input } from "./Post.api.cu.input"
import { getRandomElement } from "@mk-libs/common/array"
import { avatarStyles } from "~/domain/user/User.common"
import "@mk-libs/common/server-only"
import {
  Image,
  Post,
  PostExpertEndorsement,
  PostExpertEndorsementSkill,
} from "~/domain/post/Post.schema"
import { CategoryToPost } from "../category/Category.schema"
import { eq } from "drizzle-orm"
import { Drizzle_instance } from "~/drizzle/drizzle.instance"
import { z } from "zod"

type Context = {
  user: {
    id: number
  }
  db: Drizzle_instance
}

export default function Post_api_create(
  { user, db }: Context,
  input: z.infer<typeof Post_api_create_input>,
) {
  return db.transaction(async tx => {
    const post_created = await tx
      .insert(Post)
      .values({
        title: input.title,
        description: input.description,
        contact: input.contact,
        author_id: user.id,
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
  })
}
