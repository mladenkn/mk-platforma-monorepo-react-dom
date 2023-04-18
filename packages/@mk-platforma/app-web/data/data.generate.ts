import { faker } from "@faker-js/faker"
import { generateArray } from "@mk-libs/common/common"
import generateProducts from "./data.products"
import generateJobs from "./data.jobs"
import generateExperts from "./data.experts"
import generateGatheringsWork from "./data.gathering.work"
import generateAccomodations from "./data.accommodations"
import { WithId } from "./db.seed"
import generateGatheringsHangout from "./data.gathering.hangout"
import { PostGeneratorParams } from "./data.generate._utils"

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

export default function generatePosts(params: PostGeneratorParams) {
  const data = [
    ...generatePosts_base(params, generateExperts),
    ...generatePosts_base(params, generateJobs),
    ...generatePosts_base(params, generateProducts),
    ...generatePosts_base(params, generateGatheringsWork),
    ...generatePosts_base(params, generateGatheringsHangout),
    ...generatePosts_base(params, generateAccomodations),
  ]
  return data
}

function generatePosts_base<T>(
  params: PostGeneratorParams,
  generateFirst: (p: PostGeneratorParams) => T[]
) {
  return generateFirst(params).map(i => ({
    ...data_common_generate(params.locations),
    ...i,
  }))
}
