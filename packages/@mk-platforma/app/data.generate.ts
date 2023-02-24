import { faker } from "@faker-js/faker"
import { generateArray } from "@mk-libs/common/common"
import { writeFileSync } from "fs"
import * as cro_dataset from "./data.cro.dataset"


const avatarStyles = [
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
    avatarStyle: faker.helpers.arrayElement(avatarStyles),
  }
}

const randomJobPhoto = () =>
  faker.helpers.arrayElement([
    faker.image.business,
    faker.image.food,
    faker.image.nature,
    faker.image.transport,
  ])()

const data = {
  experts: generateArray(generateExpert, faker.datatype.number({ min: 10, max: 50 })),

  jobs: faker.helpers.shuffle(cro_dataset.jobs).map(({ label }, index) => ({
    id: index + 1,
    label,
    description: generateArray(() => 'opis oglasa ', 30).join(''),
    location: faker.helpers.arrayElement(cro_dataset.cities),
    photos: generateArray(randomJobPhoto, 3),
    adOwner: {
      phoneNumber: faker.phone.number(),
    },
  })),

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
