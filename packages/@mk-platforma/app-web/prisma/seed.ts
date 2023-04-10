import { PrismaClient } from "@prisma/client"
import generatePosts from "../data/data.generate"

const db = new PrismaClient()

async function main() {
  await seedCategories()
}

async function seedCategories() {
  await db.category.createMany({
    data: [
      { label: "job" },
      { label: "accommodation" },
      { label: "personEndorsement" },
      { label: "sellable" },
    ],
  })
  const gathering = await db.category.create({
    data: { label: "gathering" },
  })
  await db.category.createMany({
    data: [
      { label: "gathering_spirituality", parentId: gathering.id },
      { label: "gathering_work", parentId: gathering.id },
      { label: "gathering_hangout", parentId: gathering.id },
    ],
  })
}

async function seedPosts() {
  const allPosts = generatePosts()
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
