import { Drizzle_instance } from "~/drizzle/drizzle.instance"
import * as cro_dataset from "~/data.seed.common/data.gen.cro.dataset"
import { avatarStyles } from "~/domain/user/User.common"
import { User } from "~/drizzle/drizzle.schema"
import { faker } from "@faker-js/faker"

export default async function data_seed_fr_users(db: Drizzle_instance) {
  await db.insert(User).values({
    name: "Mladen",
    avatarStyle: { background: "green", color: "white" },
  })

  const users = cro_dataset.firstNames
    .filter(n => n !== "Mladen")
    .map(name => ({
      name,
      avatarStyle: faker.helpers.arrayElement(avatarStyles),
      email: "fake:" + faker.internet.email(name),
      // emailVerified: new Date(),
    }))
  await db.insert(User).values(users)
  return await db.query.User.findMany()
}
