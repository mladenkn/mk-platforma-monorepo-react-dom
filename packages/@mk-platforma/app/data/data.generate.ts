import { faker } from "@faker-js/faker"
import { generateArray } from "@mk-libs/common/common"
import { writeFileSync } from "fs"
import generateProducts from "./data.products"
import generateJobs from "./data.jobs"
import generateExpert from "./data.experts"
import generateGatherings from "./data.gathering"
import accommodations from "./data.accommodations"

const data = {
  experts: generateArray((index) => ({ id: index + 1, ...generateExpert() }), faker.datatype.number({ min: 10, max: 50 })),
  jobs: faker.helpers.shuffle(generateJobs()),
  sellableItems: generateProducts(),
  gatherings: generateGatherings(),
  accommodations,
}

writeFileSync("./data/data.json", JSON.stringify(data, null, 2))
