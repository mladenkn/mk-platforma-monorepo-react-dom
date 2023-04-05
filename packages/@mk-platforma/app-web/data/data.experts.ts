import { faker } from "@faker-js/faker"
import { generateArray } from "@mk-libs/common/common"
import { avatarStyles, generateComment } from "./data.common"
import * as cro_dataset from "./data.cro.dataset"
import { post_id_getNext } from "./data._utils"

export default function generateExpert() {
  const firstName = faker.helpers.arrayElement(cro_dataset.firstNames)
  const lastName = faker.helpers.arrayElement(cro_dataset.lastNames)

  return {
    categories: ["personEndorsement" as "personEndorsement"],
    id: post_id_getNext(),

    location: faker.helpers.arrayElement(cro_dataset.cities),
    description: generateArray(() => "opis oglasa ", 30).join(""),
    contact: faker.helpers.arrayElement([
      faker.phone.number(),
      faker.phone.number(),
      `${firstName.toLowerCase()}.${lastName.toLowerCase()}@gmail.com`,
      `${firstName.toLowerCase()}.${lastName.toLowerCase()}@yahoo.com`,
    ]),

    firstName,
    lastName,

    skills: faker.helpers.arrayElements(
      cro_dataset.skills,
      faker.datatype.number({ min: 1, max: 4 })
    ),
    avatarStyle: faker.helpers.arrayElement(avatarStyles),
    comments: generateArray(generateComment, faker.datatype.number({ min: 0, max: 7 })),
  }
}
