import { faker } from "@faker-js/faker"
import { asNonNil, generateArray } from "@mk-libs/common/common"
import { uniq } from "lodash"
import { PostGenerator_context } from "../data.seed.common/data.gen._utils"
import * as cro_dataset from "../data.seed.common/data.gen.cro.dataset"
import { avatarStyles } from "~/domain/user/User.common"
import {
  data_seed_post_insert_many,
  post_gen_base,
} from "../data.seed.common/data.seed.fr.posts._utils"
import { Drizzle_instance } from "~/drizzle/drizzle.instance"

function generateSingle({ categories }: PostGenerator_context) {
  const firstName = faker.helpers.arrayElement(cro_dataset.firstNames)
  const lastName = faker.helpers.arrayElement(cro_dataset.lastNames)

  const skills = uniq(
    faker.helpers.arrayElements(cro_dataset.skills, faker.datatype.number({ min: 1, max: 4 })),
  )

  return {
    categories: [asNonNil(categories.find(c => c.code === "job_demand"))],

    contact: faker.helpers.arrayElement([
      faker.phone.number(),
      faker.phone.number(),
      `${firstName.toLowerCase()}.${lastName.toLowerCase()}@gmail.com`,
      `${firstName.toLowerCase()}.${lastName.toLowerCase()}@yahoo.com`,
    ]),

    title: `${firstName} ${lastName}`,

    expertEndorsement: {
      firstName,
      lastName,

      skills: skills.map(skill => ({
        label: skill,
        level: faker.datatype.number({ min: 2, max: 5 }),
      })),

      avatarStyle: faker.helpers.arrayElement(avatarStyles),
    },

    images: [],
  }
}

export default async function data_seed_fr_posts_job_demand(
  db: Drizzle_instance,
  ctx: PostGenerator_context,
) {
  const posts = generateArray(() => {}, faker.datatype.number({ min: 8, max: 20 })).map(() =>
    post_gen_base(ctx, generateSingle(ctx)),
  )
  await data_seed_post_insert_many(db, posts)
}
