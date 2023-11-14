import { faker } from "@faker-js/faker"
import generatePosts, { data_seed_post_insert } from "./post.all.gen"
import { Drizzle_instance } from "~/drizzle/drizzle.instance"
import { Category, Location, User } from "~/drizzle/drizzle.schema"

export default async function data_seed_fr_posts(db: Drizzle_instance) {
  const categories = await db.select().from(Category)
  const locations = await db.select().from(Location)
  const users = await db.select().from(User)

  const posts = faker.helpers.shuffle(generatePosts({ categories, locations, users }))

  await Promise.all(
    posts.map(async post => {
      const user = faker.helpers.arrayElement(users)
      return await data_seed_post_insert(db, { ...post, user_id: user.id })
    }),
  )
}
