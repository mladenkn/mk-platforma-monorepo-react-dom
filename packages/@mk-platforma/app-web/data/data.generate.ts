import { faker } from "@faker-js/faker"
import { asNonNil, generateArray } from "@mk-libs/common/common"
import generateProducts from "./data.products"
import generateJobs from "./data.jobs"
import generateExpert from "./data.experts"
import generateGatherings from "./data.gathering"
import generateAccomodations from "./data.accommodations"
import { WithId } from "./db.seed"
import { Post_category_labelType } from "../prisma/generated/zod"

function data_common_generate(locations: WithId[]) {
  return {
    description: generateArray(() => "opis oglasa ", 30).join(""),
    location: faker.helpers.arrayElement(locations),
    contact: faker.helpers.arrayElement([faker.phone.number(), faker.internet.email()]),
    comments: generateArray(
      () => ({ content: generateArray(() => "komentar ", 20).join("") }),
      faker.datatype.number({ min: 0, max: 7 })
    ),
    title: faker.lorem.words(),
  }
}

export default function generatePosts(
  categories: (WithId & { label: Post_category_labelType })[],
  locations: WithId[]
) {
  const data = {
    experts: generateArray(
      () => ({
        ...data_common_generate(locations),
        ...generateExpert(),
        categories: [asNonNil(categories.find(c => c.label === "expertEndorsement"))],
      }),
      faker.datatype.number({ min: 10, max: 50 })
    ),
    jobs: generateJobs(() => ({
      ...data_common_generate(locations),
      categories: [asNonNil(categories.find(c => c.label === "job"))],
    })),
    sellableItems: generateProducts(() => ({
      ...data_common_generate(locations),
      categories: [asNonNil(categories.find(c => c.label === "sellable"))],
    })),
    gatherings: generateGatherings(() => ({
      ...data_common_generate(locations),
      categories: [asNonNil(categories.find(c => c.label === "gathering"))],
    })),
    accommodations: generateAccomodations().map(i => ({
      ...data_common_generate(locations),
      categories: [asNonNil(categories.find(c => c.label === "accommodation"))],
      ...i,
    })),
  }

  return faker.helpers.shuffle(Object.values(data).flat())
}
