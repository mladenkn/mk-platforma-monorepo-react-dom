import { faker } from '@faker-js/faker'
import { generateArray } from '@mk-libs/common/common'
import { writeFileSync } from 'fs'


const jobs = ['računalni programer', 'odvjetnik', 'zidar', 'vodoinstalater', 'fasader']

let expertId = 1
function generateExpert(){
  return {
    id: expertId++,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    location: faker.address.city(),
    occupations: [faker.helpers.arrayElement(jobs)],
    description: faker.lorem.text(),
    adOwner: {
      phoneNumber: faker.phone.number(),
    },
  }
}

let selableItemId = 1
function generateSellableItem(){
  return {
    id: selableItemId++,
    title: faker.lorem.sentence(7),
    description: faker.commerce.productDescription(),
    location: faker.address.city(),
    imageUrl: faker.image.technics(),
    adOwner: {
      phoneNumber: faker.phone.number(),
    },
  }
}

let jobId = 1
function generateJob(){
  const photoCount = faker.datatype.number({ min: 0, max: 6 })
  const randomPhoto = () => faker.helpers.arrayElement([
    faker.image.business,
    faker.image.food,
    faker.image.nature,
    faker.image.transport,
  ])()
  return {
    id: jobId++,
    title: faker.lorem.sentence(7),
    description: faker.lorem.paragraph(),
    location: faker.address.city(),
    photos: generateArray(randomPhoto, photoCount),
    adOwner: {
      phoneNumber: faker.phone.number(),
    },
  }
}

const data = {
  experts: generateArray(generateExpert, faker.datatype.number({ min: 10, max: 50 })),
  sellableItems: generateArray(generateSellableItem, faker.datatype.number({ min: 10, max: 50 })),
  jobs: generateArray(generateJob, faker.datatype.number({ min: 10, max: 50 })),
}
writeFileSync('./data.json', JSON.stringify(data, null, 2))
