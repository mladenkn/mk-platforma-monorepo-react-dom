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
  const rootCategories: Post_category_label[] = [
    "job",
    "accommodation",
    "personEndorsement",
    "sellable",
  ]
  await Promise.all(
    rootCategories.map(upsertCategory)
  )
  
  const gathering = await upsertCategory("gathering")
  
  await Promise.all([
    upsertCategory("gathering_spirituality", gathering.id),
    upsertCategory("gathering_work", gathering.id),
    upsertCategory("gathering_hangout", gathering.id),
  ])
}

async function upsertCategory(label: Post_category_label, parent_id?: number){
  await return db.post_category.upsert({
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
