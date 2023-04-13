import { Post_category_label } from "@prisma/client"
import generatePosts from "../data/data.generate"
import { ApiRouter_type, Api_ss } from "../trpc.router"
import locations from "../data/data.locations.json"
import { faker } from "@faker-js/faker"
import { asNonNil } from "@mk-libs/common/common"
import * as cro_dataset from "../data/data.cro.dataset"
import { avatarStyles } from "../data/data.common"
import db from "../prisma/instance"

async function main() {
  await seedCategories()
  const mladenUser = await upsertUser("Mladen", { background: "green", color: "white" })
  const otherUsers = await seedUsers()
  const users = [mladenUser, ...otherUsers]
  const users_ids = users.map(u => u.id)

  const locations = await seedLocations()

  const posts_notCreated = generatePosts()

  const images_count = await db.image.count({})
  const posts_count = await db.post.count({})

  const api = Api_ss({ db, userId: mladenUser.id })

  if (!images_count && !posts_count) {
    const posts_notCreated_withSavedImages = await posts_notCreated_map_withSaveImages(
      posts_notCreated
    )
    await seedPosts(
      api,
      asNonNil(posts_notCreated_withSavedImages),
      locations.map(l => l.id),
      users_ids
    )
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
  await upsertCategory("personEndorsement")
  await upsertCategory("sellable")

  const gathering = await upsertCategory("gathering")

  await Promise.all([
    upsertCategory("gathering_spirituality", gathering.id),
    upsertCategory("gathering_work", gathering.id),
    upsertCategory("gathering_hangout", gathering.id),
  ])
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

type Post_unsaved = ReturnType<typeof generatePosts>[number] & { images?: { url: string }[] }
async function posts_notCreated_map_withSaveImages(posts: Post_unsaved[]) {
  return await Promise.all(
    posts.map(async post => {
      const images = await Promise.all(
        (post.images || []).map(image => db.image.create({ data: { url: image.url } }))
      )
      return { ...post, images }
    })
  )
}
type Post_withSavedImages = Awaited<ReturnType<typeof posts_notCreated_map_withSaveImages>>[number]

async function seedPosts(
  api: ReturnType<typeof Api_ss>,
  posts: Post_withSavedImages[],
  locations: number[],
  users: number[]
) {
  for (const post of posts) {
    const post_created = await api.post.create({
      ...post,
      categories: post.categories.map(label => ({ label })),
      location_id: faker.helpers.arrayElement(locations),
      images: post.images.map(i => i.id),
    })
    for (const comment of post.comments) {
      await db.post_comment.create({
        data: {
          content: comment.content,
          postId: post_created.id,
          authorId: faker.helpers.arrayElement(users),
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
