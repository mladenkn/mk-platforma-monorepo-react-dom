import { faker } from "@faker-js/faker"
import { generateArray } from "@mk-libs/common/common"
import generateProducts from "./post.products.gen"
import generateJobs from "./post.jobs.gen"
import generateExperts from "./post.job.demand.gen"
import generateGatheringsWork from "./post.gathering.work.gen"
import generateAccomodations from "./post.accommodation.gen"
import generateGatheringsHangout from "./post.gathering.hangout.gen"
import { PostGeneratorParams } from "./data.gen._utils"
import generate_accomodations_demand from "./post.accommodation.demand.gen"
import generate_products_demand from "./post.products.demand.gen"

function post_common_generate({ locations }: PostGeneratorParams) {
  return {
    description: generateArray(() => "opis oglasa ", 30).join(""),
    location: faker.helpers.arrayElement(locations),
    contact: faker.helpers.arrayElement([faker.phone.number(), faker.internet.email()]),
    comments: generateArray(
      () => ({ content: generateArray(() => "komentar ", 20).join("") }),
      faker.datatype.number({ min: 0, max: 7 }),
    ),
    title: faker.lorem.words(),
  }
}

export default function generatePosts(params: PostGeneratorParams) {
  function generatePosts_base<T>(generateFirst: (p: PostGeneratorParams) => T[]) {
    return generateFirst(params).map(i => ({
      ...post_common_generate(params),
      ...i,
    }))
  }

  const _data = [
    ...generatePosts_base(generateExperts),
    ...generatePosts_base(generateJobs),
    ...generatePosts_base(generateProducts),
    ...generatePosts_base(generateGatheringsWork),
    ...generatePosts_base(generateGatheringsHangout),
    ...generatePosts_base(generateAccomodations),
    ...generatePosts_base(generate_accomodations_demand),
    ...generatePosts_base(generate_products_demand),
  ]
  type Item = (typeof _data)[number] & { images?: { url: string }[] }

  const data: Item[] = _data
  return data
}
