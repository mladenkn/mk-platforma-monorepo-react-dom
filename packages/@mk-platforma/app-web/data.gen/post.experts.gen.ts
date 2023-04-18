import { faker } from "@faker-js/faker"
import { asNonNil, generateArray } from "@mk-libs/common/common"
import { uniq } from "lodash"
import { avatarStyles } from "./data.common"
import * as cro_dataset from "./data.gen.cro.dataset"
import { PostGeneratorParams } from "./data.gen._utils"

function generateSingle({ categories }: PostGeneratorParams) {
  const firstName = faker.helpers.arrayElement(cro_dataset.firstNames)
  const lastName = faker.helpers.arrayElement(cro_dataset.lastNames)

  const skills = uniq(
    faker.helpers.arrayElements(cro_dataset.skills, faker.datatype.number({ min: 1, max: 4 }))
  )

  return {
    categories: [asNonNil(categories.find(c => c.label === "expertEndorsement"))],

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
  }
}

export default function generateExperts(params: PostGeneratorParams) {
  return generateArray(() => {}, faker.datatype.number({ min: 8, max: 20 })).map(() =>
    generateSingle(params)
  )
}
