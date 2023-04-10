import { Post_category_label, PrismaClient } from "@prisma/client"
import generatePosts from "../data/data.generate"
import { Api_ss } from "../trpc.router"
import locations from "../data/data.locations.json"

const db = new PrismaClient()

async function main() {
  await seedCategories()
  await db.user.create({
    data: {
      name: "Mladen",
      avatarStyle: { background: "green", color: "white" },
    },
  })
  // await seedPosts()
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

async function seedPosts() {
  const allPosts = generatePosts()
  for (const input of allPosts) {
    await Api_ss.post.create({
      ...input,
      categories: input.categories.map(label => ({ label })),
    })
  }
}

async function seedLocations() {
  for (const location of locations) {
    await db.location.upsert({
      where: { google_id: location.google_id },
      create: location,
      update: location,
    })
  }
  await db.location.createMany({
    data: locations,
  })
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
