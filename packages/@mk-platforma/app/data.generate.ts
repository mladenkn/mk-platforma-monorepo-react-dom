import { faker } from "@faker-js/faker"
import { generateArray } from "@mk-libs/common/common"
import { writeFileSync } from "fs"
import * as cro_dataset from "./data.cro.dataset"

const avatar_props = [
  { background: "green", color: "white" },
  { background: "yellow" },
  { background: "red", color: "white" },
  { background: "blue", color: "white" },
  { background: "orange" },
]

let expertId = 1
function generateExpert() {
  return {
    id: expertId++,
    firstName: faker.helpers.arrayElement(cro_dataset.firstNames),
    lastName: faker.helpers.arrayElement(cro_dataset.lastNames),
    location: faker.helpers.arrayElement(cro_dataset.cities),
    occupations: [faker.helpers.arrayElement(cro_dataset.occupations)],
    description: faker.lorem.text(),
    phoneNumber: faker.phone.number(),
    avatarStyle: faker.helpers.arrayElement(avatar_props),
  }
}

let jobId = 1
function generateJob() {
  const photoCount = faker.datatype.number({ min: 0, max: 6 })
  const randomPhoto = () =>
    faker.helpers.arrayElement([
      faker.image.business,
      faker.image.food,
      faker.image.nature,
      faker.image.transport,
    ])()
  return {
    id: jobId++,
    title: faker.lorem.sentence(7),
    description: faker.lorem.paragraph(),
    location: faker.helpers.arrayElement(cro_dataset.cities),
    photos: generateArray(randomPhoto, photoCount),
    adOwner: {
      phoneNumber: faker.phone.number(),
    },
  }
}

const data = {
  experts: generateArray(generateExpert, faker.datatype.number({ min: 10, max: 50 })),
  jobs: generateArray(generateJob, faker.datatype.number({ min: 10, max: 50 })),

  sellableItems: cro_dataset.products.map(({ label, image, description }, index) => ({
    id: index + 1,
    title: label,
    imageUrl: image,
    description,
    adOwner: {
      phoneNumber: faker.phone.number(),
    },
    location: faker.helpers.arrayElement(cro_dataset.cities),
  })),
}
writeFileSync("./data.json", JSON.stringify(data, null, 2))
