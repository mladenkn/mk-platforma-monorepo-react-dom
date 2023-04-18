import { faker } from "@faker-js/faker"
import { asNonNil, generateArray } from "@mk-libs/common/common"
import generateProducts from "./data.products"
import generateJobs from "./data.jobs"
import generateExperts from "./data.experts"
import generateGatheringsWork from "./data.gathering.work"
import generateAccomodations from "./data.accommodations"
import { WithId } from "./db.seed"
import { Post_category_labelType } from "../prisma/generated/zod"
import generateGatheringsHangout from "./data.gathering.hangout"

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
  const data = [
    ...generateExperts({ categories }).map(i => ({
      ...data_common_generate(locations),
      ...i,
    })),
    ...generateJobs({ categories }).map(i => ({
      ...data_common_generate(locations),
      ...i,
    })),
    ...generateProducts({ categories }).map(i => ({
      ...data_common_generate(locations),
      ...i,
    })),
    ...generateGatheringsWork({ categories }).map(i => ({
      ...data_common_generate(locations),
      ...i,
    })),
    ...generateGatheringsHangout({ categories }).map(i => ({
      ...data_common_generate(locations),
      ...i,
    })),
    ...generateAccomodations({ categories }).map(i => ({
      ...data_common_generate(locations),
      ...i,
    })),
  ]
  return data
}
