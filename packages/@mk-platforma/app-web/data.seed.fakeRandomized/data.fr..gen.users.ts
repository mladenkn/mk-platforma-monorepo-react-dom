import * as cro_dataset from "~/data.seed.common/data.gen.cro.dataset"
import { avatarStyles } from "~/domain/user/User.common"
import { faker } from "@faker-js/faker"

export default function data_fr_gen_users() {
  const mladen = {
    name: "Mladen",
    avatarStyle: { background: "green", color: "white" },
  }

  const others = cro_dataset.firstNames
    .filter(n => n !== "Mladen")
    .map(name => ({
      name,
      avatarStyle: faker.helpers.arrayElement(avatarStyles),
      email: "fake:" + faker.internet.email(name),
      // emailVerified: new Date(),
    }))

  return [mladen, ...others]
}
