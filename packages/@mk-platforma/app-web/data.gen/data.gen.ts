import { faker } from "@faker-js/faker"
import { generateArray } from "@mk-libs/common/common"
import generateProducts from "./post.products.gen"
import generateJobs from "./post.jobs.gen"
import generateExperts from "./post.experts.gen"
import generateGatheringsWork from "./post.gathering.work.gen"
import generateAccomodations from "./post.accommodation.gen"
import { WithId } from "./db.seed"
import generateGatheringsHangout from "./post.gathering.hangout.gen"
import { PostGeneratorParams } from "./data.gen._utils"

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