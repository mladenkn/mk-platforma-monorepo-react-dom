import { Post_category_label } from "@prisma/client"
import generatePosts from "./data.generate"
import { Api_ss } from "../trpc.server"
import locations from "./data.locations.json"
import { faker } from "@faker-js/faker"
import * as cro_dataset from "./data.cro.dataset"
import { avatarStyles } from "./data.common"
import db from "../prisma/instance"

export type WithId = {
  id: number
}

async function main() {
  const categories = await seedCategories()

  const mladenUser = await upsertUser("Mladen", { background: "green", color: "white" })
  const otherUsers = await seedUsers()
  const users = [mladenUser, ...otherUsers]
  const users_ids = users.map(u => u.id)

  const locations = await seedLocations()

  const posts = generatePosts(categories, locations)

  const images_count = await db.image.count({})
  const posts_count = await db.post.count({})

  const api = Api_ss({ db, userId: mladenUser.id })

  if (!images_count && !posts_count) {
    await seedPosts(api, posts, users_ids)
  }
}

async function seedUsers() {
  const users = cro_dataset.firstNames
    .filter(n => n !== "Mladen")
    .map(name => ({
      name,
      avatarStyle: faker.helpers.arrayElement(avatarStyles),
    }))
  await db.user.createMany({ data: users })
  return await db.user.findMany({})
}

async function upsertUser(name: string, avatarStyle: object) {
  return await db.user.upsert({
    where: { name },
    update: {
      name,
      avatarStyle,
    },
    create: {
      name,
      avatarStyle,
    },
  })
}

async function seedCategories() {
  await upsertCategory("job")
  await upsertCategory("accommodation")
  await upsertCategory("expertEndorsement")
  await upsertCategory("sellable")

  const gathering = await upsertCategory("gathering")

  await Promise.all([
    upsertCategory("gathering_spirituality", gathering.id),
    upsertCategory("gathering_work", gathering.id),
    upsertCategory("gathering_hangout", gathering.id),
  ])

  return await db.post_category.findMany({})
}

async function upsertCategory(label: Post_category_label, parent_id?: number) {
  return await db.post_category.upsert({
    where: { label },
    create: { label, parent_id },
    update: { label, parent_id },
  })
}

async function seedLocations() {
  return await Promise.all(
    locations.map(location =>
      db.location.upsert({
        where: { google_id: location.google_id },
        create: location,
        update: location,
      })
    )
  )
}

async function seedPosts(
  api: ReturnType<typeof Api_ss>,
  posts: ReturnType<typeof generatePosts>,
  users: number[]
) {
  for (const post of posts) {
    const post_created = await api.post.create({
      ...post,
      categories: post.categories,
    })
    for (const comment of post.comments) {
      await db.post_comment.create({
        data: {
          content: comment.content,
          post_id: post_created.id,
          author_id: faker.helpers.arrayElement(users),
        },
      })
    }
  }
}

main()
  .then(async () => {
    await db.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
  })
