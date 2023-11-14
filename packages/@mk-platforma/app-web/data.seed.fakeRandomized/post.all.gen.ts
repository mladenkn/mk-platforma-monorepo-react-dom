import { faker } from "@faker-js/faker"
import { generateArray } from "@mk-libs/common/common"
import generateProducts from "./post.products.gen"
import generateJobs from "./post.jobs.gen"
import generateExperts from "./post.job.demand.gen"
import generateGatheringsWork from "./post.gathering.work.gen"
import generateAccomodations from "./post.accommodation.gen"
import generateGatheringsHangout from "./post.gathering.hangout.gen"
import { PostGenerator_context as PostGenerator_context } from "./data.gen._utils"
import generate_accomodations_demand from "./post.accommodation.demand.gen"
import generate_products_demand from "./post.products.demand.gen"

function post_common_generate({ locations, users }: PostGenerator_context) {
  return {
    description: generateArray(() => "opis oglasa ", 30).join(""),
    location: faker.helpers.arrayElement(locations),
    contact: faker.helpers.arrayElement([faker.phone.number(), faker.internet.email()]),
    comments: generateArray(
      () => ({
        content: generateArray(() => "komentar ", 20).join(""),
        author_id: faker.helpers.arrayElement(users)!.id,
      }),
      faker.datatype.number({ min: 0, max: 7 }),
    ),
    title: faker.lorem.words(),
  }
}

type Image = { isMain?: boolean; url: string }
function post_images_add_isMain(images: Image[]) {
  const images_mapped = images.map(i => ({ ...i, isMain: i.isMain || false }))
  const hasMain = images_mapped.some(image => image.isMain)
  if (!hasMain) {
    const randomItem = faker.helpers.arrayElement(images_mapped)
    randomItem.isMain = true
  }
  return images_mapped
}

type WithImages = { images?: Image[] } | {}
function post_addCommon<T extends WithImages>(ctx: PostGenerator_context, post: T) {
  const images =
    "images" in post && post.images?.length ? post_images_add_isMain(post.images) : undefined
  return {
    ...post_common_generate(ctx),
    ...post,
    images,
  }
}

export default function generatePosts(params: PostGenerator_context) {
  const data = [
    ...generateExperts(params).map(post => post_addCommon(params, post)),
    ...generateJobs(params).map(post => post_addCommon(params, post)),
    ...generateProducts(params).map(post => post_addCommon(params, post)),
    ...generateGatheringsWork(params).map(post => post_addCommon(params, post)),
    ...generateGatheringsHangout(params).map(post => post_addCommon(params, post)),
    ...generateAccomodations(params).map(post => post_addCommon(params, post)),
    ...generate_accomodations_demand(params).map(post => post_addCommon(params, post)),
    ...generate_products_demand(params).map(post => post_addCommon(params, post)),
  ]
  return data
}
