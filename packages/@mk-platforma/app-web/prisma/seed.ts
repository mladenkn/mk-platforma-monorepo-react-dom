import { shallowPick } from "@mk-libs/common/common"
import { PrismaClient } from "@prisma/client"
import generatePosts from "../data/data.generate"
import { PersonEndorsementOnly } from "../data/data.types"
import { castIf } from "@mk-libs/common/common"

const db = new PrismaClient()

async function main() {
  await seedCategories()
  const user = await db.user.create({
    data: {
      name: "Mladen",
      avatarStyle: { background: "green", color: "white" },
    },
  })
  await seedPosts(user.id)
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

async function seedPosts(author_id: number) {
  const allPosts = generatePosts()
  for (const post of allPosts) {
    await db.$transaction(async tx => {
      const post_created = await tx.post.create({
        data: {
          ...shallowPick(post, "title", "description", "contact"),
          author_id,
          categories: {
            connect: post.categories.map(label => ({ label })),
          },
        },
        include: {
          categories: true,
        },
      })
      if (
        castIf<{ asPersonEndorsement: PersonEndorsementOnly }>(
          post,
          (post.categories as any).includes("personEndorsement")
        )
      ) {
        await tx.post.update({
          where: {
            id: post_created.id,
          },
          data: {
            asPersonEndorsement: {
              create: {
                postId: post_created.id,
                ...shallowPick(post.asPersonEndorsement, "firstName", "lastName", "avatarStyle"),
              },
            },
          },
        })
      }
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
