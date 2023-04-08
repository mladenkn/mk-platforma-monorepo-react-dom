import { PrismaClient } from "@prisma/client"

const db = new PrismaClient()

const categoreis = [
  "job",
  "accommodation",
  "personEndorsement",
  "sellable",
  "gathering",
  "gathering/spirituality",
  "gathering/work",
  "gathering/hangout",
]

async function main() {
  await db.category.createMany({
    data: categoreis.map(label => ({ label })),
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
