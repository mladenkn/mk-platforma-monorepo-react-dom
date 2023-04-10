import { PrismaClient } from "@prisma/client"
import generatePosts from "../data/data.generate"
import { Api_ss } from "../trpc.router"

const db = new PrismaClient()

async function main() {
  await seedCategories()
  await db.user.create({
    data: {
      name: "Mladen",
      avatarStyle: { background: "green", color: "white" },
    },
  })
  await seedPosts()
}

async function seedCategories() {
  await db.post_category.createMany({
    data: [
      { label: "job" },
      { label: "accommodation" },
      { label: "personEndorsement" },
      { label: "sellable" },
    ],
  })
  const gathering = await db.post_category.create({
    data: { label: "gathering" },
  })
  await db.post_category.createMany({
    data: [
      { label: "gathering_spirituality", parent_id: gathering.id },
      { label: "gathering_work", parent_id: gathering.id },
      { label: "gathering_hangout", parent_id: gathering.id },
    ],
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

main()
  .then(async () => {
    await db.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
  })
