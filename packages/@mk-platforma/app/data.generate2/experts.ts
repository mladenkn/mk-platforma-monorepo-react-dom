import { faker } from "@faker-js/faker"
import * as cro_dataset from "../data.cro.dataset"

const avatarStyles = [
  { background: "green", color: "white" },
  { background: "yellow" },
  { background: "red", color: "white" },
  { background: "blue", color: "white" },
  { background: "orange" },
]

export default function generateExpert() {
  return {
    firstName: faker.helpers.arrayElement(cro_dataset.firstNames),
    lastName: faker.helpers.arrayElement(cro_dataset.lastNames),
    location: faker.helpers.arrayElement(cro_dataset.cities),
    occupations: [faker.helpers.arrayElement(cro_dataset.occupations)],
    description: faker.lorem.text(),
    phoneNumber: faker.phone.number(),
    avatarStyle: faker.helpers.arrayElement(avatarStyles),
  }
}