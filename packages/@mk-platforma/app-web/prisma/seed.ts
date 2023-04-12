import { Post_category_label, PrismaClient } from "@prisma/client"
import generatePosts from "../data/data.generate"
import { Api_ss } from "../trpc.router"
import locations from "../data/data.locations.json"
import { faker } from "@faker-js/faker"
import { asNonNil } from "@mk-libs/common/common"

const db = new PrismaClient()

async function main() {
  await seedCategories()

  await db.user.upsert({
    where: { name: "Mladen" },
    update: {
      name: "Mladen",
      avatarStyle: { background: "green", color: "white" },
    },
    create: {
      name: "Mladen",
      avatarStyle: { background: "green", color: "white" },
    },
  })

  const locations = await seedLocations()

  const posts_notCreated = generatePosts()

  const images_count = await db.image.count({})
  const posts_count = await db.post.count({})

  if (!images_count && !posts_count) {
    const posts_notCreated_withSavedImages = await posts_notCreated_map_withSaveImages(
      posts_notCreated
    )
    await seedPosts(
      asNonNil(posts_notCreated_withSavedImages),
      locations.map(l => l.id)
    )
  }
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

async function seedPosts(posts: Post_withSavedImages[], locations: number[]) {
  for (const post of posts) {
    await Api_ss.post.create({
      ...post,
      categories: post.categories.map(label => ({ label })),
      location_id: faker.helpers.arrayElement(locations),
      images: post.images.map(i => i.id),
    })
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
