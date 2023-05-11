import { Category_label } from "@prisma/client"
import generatePosts from "./data.gen"
import { Api_ss } from "../api/api.root"
import locations from "./locations.gen.json"
import { faker } from "@faker-js/faker"
import * as cro_dataset from "./data.gen.cro.dataset"
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

  const posts = faker.helpers.shuffle(generatePosts({ categories, locations }))

  const images_count = await db.image.count({})
  const posts_count = await db.post.count({})

  if (!images_count && !posts_count) {
    await seedPosts(posts, users_ids)
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
  await upsertCategory("job_demand")
  await upsertCategory("accommodation_demand")

  const gathering = await upsertCategory("gathering")

  await Promise.all([
    upsertCategory("gathering_spirituality", gathering.id),
    upsertCategory("gathering_work", gathering.id),
    upsertCategory("gathering_hangout", gathering.id),
  ])

  const sellable = await upsertCategory("sellable")
  await Promise.all([
    upsertCategory("sellable_food", sellable.id),
    upsertCategory("sellable_clothes", sellable.id),
    upsertCategory("sellable_furniture", sellable.id),
    upsertCategory("sellable_tool", sellable.id),
    upsertCategory("sellable_gadget", sellable.id),
    upsertCategory("sellable_buildingMaterial", sellable.id),
  ])

  return await db.category.findMany({})
}

async function upsertCategory(label: Category_label, parent_id?: number) {
  return await db.category.upsert({
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

async function seedPosts(posts: ReturnType<typeof generatePosts>, users: number[]) {
  for (const post of posts) {
    const api = Api_ss({ db, userId: faker.helpers.arrayElement(users) })
    const post_created = await api.post.create({
      ...post,
      categories: post.categories,
    })
    for (const comment of post.comments) {
      await db.comment.create({
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
