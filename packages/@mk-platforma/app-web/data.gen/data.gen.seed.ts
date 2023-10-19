import { faker } from "@faker-js/faker"
import { Api_ss } from "~/api_/api.root"
import { avatarStyles } from "~/domain/user/User.common"
import generatePosts from "./data.gen"
import * as cro_dataset from "./data.gen.cro.dataset"
import { eva } from "@mk-libs/common/common"
import { seedCategories, seedLocations } from "~/data.seed"
import { AvatarStyle } from "~/domain/user/User.types"
import { Comment } from "~/domain/post/Post.schema"
import { User } from "~/domain/user/User.schema"
import type { Drizzle_instance } from "~/drizzle/drizzle.instance"

export type WithId = {
  id: number
}

export default async function data_gen_seed(db: Drizzle_instance) {
  async function seedUsers() {
    const users = cro_dataset.firstNames
      .filter(n => n !== "Mladen")
      .map(name => ({
        name,
        avatarStyle: faker.helpers.arrayElement(avatarStyles),
        email: "fake:" + faker.internet.email(name),
        // emailVerified: new Date(),
      }))
    await db.insert(User).values(users)
    return await db.query.User.findMany()
  }

  function upsertUser(user_: { name: string; avatarStyle: AvatarStyle }) {
    return db
      .insert(User)
      .values(user_)
      .returning()
      .then(u => u[0])
  }

  async function seedPosts(
    posts: ReturnType<typeof generatePosts>,
    users: { id: number; name?: string | null }[],
  ) {
    for (const post of posts) {
      const user = faker.helpers.arrayElement(users)

      const api = Api_ss({
        user: { id: user.id, name: user.name || "seed user", canMutate: true },
        getCookie: (() => {}) as any,
        db: db,
      })

      const images = await eva(async () => {
        if (!post.images?.length) return undefined
        const images_created = await api.image.create(post.images!)
        const images_withIsMain = images_created.map(i => ({
          ...i,
          isMain: false,
        }))
        const mainImage = faker.helpers.arrayElement(images_withIsMain)
        mainImage.isMain = true
        return images_withIsMain
      })

      const post_created = await api.post.create({
        ...post,
        images,
      })

      for (const comment of post.comments) {
        await db.insert(Comment).values({
          content: comment.content,
          post_id: post_created.id,
          author_id: faker.helpers.arrayElement(users)!.id,
        })
      }
    }
  }

  const categories = await seedCategories(db)

  const mladenUser = await upsertUser({
    name: "Mladen",
    avatarStyle: { background: "green", color: "white" },
  })
  const otherUsers = await seedUsers()
  const users = [mladenUser, ...otherUsers]

  const locations = await seedLocations(db)

  const posts = faker.helpers.shuffle(generatePosts({ categories, locations }))
  await seedPosts(posts, users)
}

// main()
//   .then(async () => {
//     console.log("Done seeding db")
//   })
//   .catch(async e => {
//     console.error(e)
//     process.exit(1)
//   })
