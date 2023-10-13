import { Prisma } from "@prisma/client"
import { faker } from "@faker-js/faker"
import { Api_ss } from "~/api_/api.root"
import { avatarStyles } from "~/domain/user/User.common"
import db from "~/prisma/instance"
import generatePosts from "./data.gen"
import * as cro_dataset from "./data.gen.cro.dataset"
import { eva } from "@mk-libs/common/common"
import { seedCategories, seedLocations } from "~/data.seed"
import { drizzle_connect } from "~/drizzle/drizzle.utils"

export type WithId = {
  id: number
}

const [db_drizzle, postgres_client] = drizzle_connect()

async function main() {
  const categories = await seedCategories()

  const mladenUser = await upsertUser({
    name: "Mladen",
    avatarStyle: JSON.stringify({ background: "green", color: "white" }),
  })
  const otherUsers = await seedUsers()
  const users = [mladenUser, ...otherUsers]

  const locations = await seedLocations()

  const posts = faker.helpers.shuffle(generatePosts({ categories, locations }))
  await seedPosts(posts, users)
}

async function seedUsers() {
  const users = cro_dataset.firstNames
    .filter(n => n !== "Mladen")
    .map(name => ({
      name,
      avatarStyle: JSON.stringify(faker.helpers.arrayElement(avatarStyles)),
      email: "fake:" + faker.internet.email(name),
      emailVerified: new Date(),
    }))
  await db.user.createMany({ data: users })
  return await db.user.findMany({})
}

async function upsertUser(user: { name: string; avatarStyle: string }) {
  return await db.user.upsert({
    where: { name: user.name },
    update: user,
    create: user,
  })
}

async function seedPosts(
  posts: ReturnType<typeof generatePosts>,
  users: { id: number; name?: string | null }[],
) {
  for (const post of posts) {
    const user = faker.helpers.arrayElement(users)

    const api = Api_ss({
      db,
      user: { id: user.id, name: user.name || "seed user", canMutate: true },
      getCookie: (() => {}) as any,
      db_drizzle,
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
      await db.comment.create({
        data: {
          content: comment.content,
          post_id: post_created.id,
          author_id: faker.helpers.arrayElement(users)!.id,
        },
      })
    }
  }
}

main()
  .then(async () => {
    await db.$disconnect()
    await postgres_client.end()
    console.log("Done seeding db")
  })
  .catch(async e => {
    console.error(e)
    await db.$disconnect()
    await postgres_client.end()
    process.exit(1)
  })
