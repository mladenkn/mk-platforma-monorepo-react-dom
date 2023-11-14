import { faker } from "@faker-js/faker"
import generatePosts from "~/data.seed.fakeRandomized/post.all.gen"
import { Drizzle_instance } from "~/drizzle/drizzle.instance"
import { Category, Location, User, Comment, Image } from "~/drizzle/drizzle.schema"
import { eva } from "@mk-libs/common/common"
import Post_api_create from "~/domain/post/Post.api.create"

export default async function seedPosts(db: Drizzle_instance) {
  const categories = await db.select().from(Category)
  const locations = await db.select().from(Location)
  const users = await db.select().from(User)

  const posts = faker.helpers.shuffle(generatePosts({ categories, locations, users }))

  await Promise.all(
    posts.map(async post => {
      const user = faker.helpers.arrayElement(users)

      const images_created = await eva(async () => {
        if (!post.images?.length) return undefined
        return await db.insert(Image).values(post.images).returning()
      })

      const ctx = {
        user: { id: user.id, name: user.name || "seed user", canMutate: true },
        db,
      }

      const post_created = await Post_api_create(ctx, {
        ...post,
        images: images_created,
      })

      if (!post.comments?.length) return

      const comments_mapped = post.comments.map(c => ({
        ...c,
        post_id: post_created.id,
      }))

      await db.insert(Comment).values(comments_mapped)
    }),
  )
}

seedPosts.dbSeeder = {}
