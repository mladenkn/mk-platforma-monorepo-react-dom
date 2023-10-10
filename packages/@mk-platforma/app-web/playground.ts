import db from "./prisma/instance"

async function main() {
  console.log(await db.category.findMany({}))
}

main()
  .then(async () => {
    await db._asPrisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await db._asPrisma.$disconnect()
    process.exit(1)
  })
