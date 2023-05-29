import db from "./prisma/instance"

async function main() {
  console.log(await db.category.findMany({}))
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
