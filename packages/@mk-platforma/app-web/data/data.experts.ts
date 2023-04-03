import { faker } from "@faker-js/faker"
import { generateArray } from "@mk-libs/common/common"
import { avatarStyles, generateComment } from "./data.common"
import * as cro_dataset from "./data.cro.dataset"
import { post_id_getNext } from "./data._utils"

export default function generateExpert() {
  return {
    categories: ["personEndorsement" as "personEndorsement"],
    id: post_id_getNext(),

    location: faker.helpers.arrayElement(cro_dataset.cities),
    description: faker.lorem.text(),
    phoneNumber: faker.phone.number(),

    firstName: faker.helpers.arrayElement(cro_dataset.firstNames),
    lastName: faker.helpers.arrayElement(cro_dataset.lastNames),
    skills: faker.helpers.arrayElements(
      cro_dataset.skills,
      faker.datatype.number({ min: 1, max: 4 })
    ),
    avatarStyle: faker.helpers.arrayElement(avatarStyles),
    comments: generateArray(generateComment, faker.datatype.number({ min: 0, max: 7 })),
  }
}
