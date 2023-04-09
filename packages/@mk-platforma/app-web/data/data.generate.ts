import { faker } from "@faker-js/faker"
import { generateArray } from "@mk-libs/common/common"
import { writeFileSync } from "fs"
import generateProducts from "./data.products"
import generateJobs from "./data.jobs"
import generateExpert from "./data.experts"
import generateGatherings from "./data.gathering"
import * as cro_dataset from "./data.cro.dataset"
import { post_id_getNext } from "./data._utils"
import { generateComment } from "./data.common"

function data_common_generate() {
  return {
    id: post_id_getNext(),
    description: generateArray(() => "opis oglasa ", 30).join(""),
    location: faker.helpers.arrayElement([
      ...cro_dataset.cities,
      ...cro_dataset.villages,
      ...cro_dataset.villages,
    ]),
    contact: faker.helpers.arrayElement([faker.phone.number(), faker.internet.email()]),
    comments: generateArray(generateComment, faker.datatype.number({ min: 0, max: 7 })),
  }
}

const data = {
  experts: generateArray(generateExpert, faker.datatype.number({ min: 10, max: 50 })),
  jobs: generateJobs(),
  sellableItems: generateProducts(),
  gatherings: generateGatherings(),
  ...require("./data.accommodations"),
}

const allPosts = faker.helpers.shuffle(Object.values(data).flat())

writeFileSync("./data/data.json", JSON.stringify({ allPosts }, null, 2))
