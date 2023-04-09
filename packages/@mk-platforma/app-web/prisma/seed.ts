import { PrismaClient, CategoryLabel } from "@prisma/client"

const db = new PrismaClient()

const categories: CategoryLabel[] = [
  "job",
  "accommodation",
  "personEndorsement",
  "sellable",
  "gathering",
  "gathering_spirituality",
  "gathering_work",
  "gathering_hangout",
]

async function main() {
  await db.category.createMany({
    data: categories.map(label => ({ label })),
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
