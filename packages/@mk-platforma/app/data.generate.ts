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
    area: faker.address.city(),
    occupations: [faker.helpers.arrayElement(jobs)],
    description: faker.lorem.text(),
    phone: faker.phone.number(),
  }
}

let selableItemId = 1
function generateSellableItem(){
  return {
    id: selableItemId++,
    title: faker.lorem.sentence(7),
    description: faker.commerce.productDescription(),
    area: faker.address.city(),
    imageUrl: faker.image.technics(),
    adOwner: {
      phoneNumber: faker.phone.number(),
    },
  }
}

const data = {
  experts: generateArray(generateExpert, 5),
  sellableItems: generateArray(generateSellableItem, 5)
}
writeFileSync('./data.json', JSON.stringify(data, null, 2))
