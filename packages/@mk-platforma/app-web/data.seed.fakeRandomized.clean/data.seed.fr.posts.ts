import { faker } from "@faker-js/faker"
import generatePosts from "~/data.seed.fakeRandomized/post.all.gen"
import { Drizzle_instance } from "~/drizzle/drizzle.instance"
import { Category, Location, User, Comment } from "~/drizzle/drizzle.schema"
import { Api_ss } from "~/api_/api.root"
import { eva } from "@mk-libs/common/common"

export default async function seedPosts(db: Drizzle_instance) {
  const categories = await db.select().from(Category)
  const locations = await db.select().from(Location)
  const users = await db.select().from(User)

  const posts = faker.helpers.shuffle(generatePosts({ categories, locations, users }))

  for (const post of posts) {
    const user = faker.helpers.arrayElement(users)

    const api = Api_ss({
      user: { id: user.id, name: user.name || "seed user", canMutate: true },
      getCookie: (() => {}) as any,
      db,
    })

    const images_created = await eva(async () => {
      if (!post.images?.length) return undefined
      return await api.image.create(post.images!)
    })

    const post_created = await api.post.create({
      ...post,
      images: images_created,
    })

    for (const comment of post.comments) {
      await db.insert(Comment).values({
        ...comment,
        post_id: post_created.id,
      })
    }
  }
}

seedPosts.dbSeeder = {}
