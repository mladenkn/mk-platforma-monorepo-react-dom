import { faker } from "@faker-js/faker"
import { avatarStyles } from "./data.common"
import * as cro_dataset from "./data.cro.dataset"

export default function generateExpert() {
  const firstName = faker.helpers.arrayElement(cro_dataset.firstNames)
  const lastName = faker.helpers.arrayElement(cro_dataset.lastNames)

  return {
    categories: ["personEndorsement" as "personEndorsement"],
    contact: faker.helpers.arrayElement([
      faker.phone.number(),
      faker.phone.number(),
      `${firstName.toLowerCase()}.${lastName.toLowerCase()}@gmail.com`,
      `${firstName.toLowerCase()}.${lastName.toLowerCase()}@yahoo.com`,
    ]),

    title: `${firstName} ${lastName}`,

    asPersonEndorsement: {
      firstName,
      lastName,

      skills: faker.helpers
        .arrayElements(cro_dataset.skills, faker.datatype.number({ min: 1, max: 4 }))
        .map(skill => ({ label: skill, level: faker.datatype.number({ min: 2, max: 5 }) })),

      avatarStyle: faker.helpers.arrayElement(avatarStyles),
    },
  }
}
