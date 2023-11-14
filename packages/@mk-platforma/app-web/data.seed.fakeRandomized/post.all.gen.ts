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

function post_images_add_isMain(images: { isMain?: boolean; url: string }[]) {
  const images_mapped = images.map(i => ({ ...i, isMain: i.isMain || false }))
  const hasMain = images_mapped.some(image => image.isMain)
  if (!hasMain) {
    const randomItem = faker.helpers.arrayElement(images_mapped)
    randomItem.isMain = true
  }
  return images_mapped
}

function post_addCommon<T extends WithImages>(ctx: PostGenerator_context, post: T) {
  const images =
    "images" in post && post.images?.length ? post_images_add_isMain(post.images) : undefined
  return {
    ...post_common_generate(ctx),
    ...post,
    images,
  }
}

type WithImages = { images?: { isMain?: boolean; url: string }[] } | {}

export default function generatePosts(params: PostGenerator_context) {
  function generatePosts_base<T extends WithImages>(
    generateFirst: (p: PostGenerator_context) => T[],
  ) {
    return generateFirst(params).map(post => {
      const images =
        "images" in post && post.images?.length ? post_images_add_isMain(post.images) : undefined
      return {
        ...post_common_generate(params),
        ...post,
        images,
      }
    })
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
