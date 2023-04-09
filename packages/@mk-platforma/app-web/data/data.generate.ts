import { faker } from "@faker-js/faker"
import { generateArray } from "@mk-libs/common/common"
import { writeFileSync } from "fs"
import generateProducts from "./data.products"
import generateJobs from "./data.jobs"
import generateExpert from "./data.experts"
import generateGatherings from "./data.gathering"

const data = {
  experts: generateArray(generateExpert, faker.datatype.number({ min: 10, max: 50 })),
  jobs: generateJobs(),
  sellableItems: generateProducts(),
  gatherings: generateGatherings(),
  ...require("./data.accommodations"),
}

const allPosts = faker.helpers.shuffle(Object.values(data).flat())

writeFileSync("./data/data.json", JSON.stringify({ allPosts }, null, 2))
