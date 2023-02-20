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

const experts = generateArray(generateExpert, 5)
writeFileSync('./data.json', JSON.stringify({ experts }, null, 2))
