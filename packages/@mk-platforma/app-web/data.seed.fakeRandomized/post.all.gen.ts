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
import { Post_api_create_input } from "~/domain/post/Post.api.cu.input"
import { z } from "zod"
import { Drizzle_instance } from "~/drizzle/drizzle.instance"
import Post_api_create from "~/domain/post/Post.api.create"
import { Comment, Image } from "~/drizzle/drizzle.schema"

type WithImages = { images?: { url: string; isMain?: boolean }[] }

export function post_gen_base<TPost extends WithImages>(
  { locations, users }: PostGenerator_context,
  post: TPost,
) {
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

    ...post,

    images: post.images && post_gen_images_addIsMain(post.images),
  }
}

function post_gen_images_addIsMain(images: { url: string; isMain?: boolean }[]) {
  if (!images?.length) return []
  const images_mapped = images.map(image => ({
    ...image,
    isMain: image.isMain || false,
  }))
  const hasMain = images_mapped.some(image => image.isMain)
  if (!hasMain) {
    const randomItem = faker.helpers.arrayElement(images_mapped)
    randomItem.isMain = true
  }
  return images_mapped
}

export default function generatePosts(params: PostGenerator_context) {
  const _data = [
    ...generateExperts(params),
    ...generateJobs(params),
    ...generateProducts(params),
    ...generateGatheringsWork(params),
    ...generateGatheringsHangout(params),
    ...generateAccomodations(params),
    ...generate_accomodations_demand(params),
    ...generate_products_demand(params),
  ]
  type Item = (typeof _data)[number] & { images?: { url: string }[] }

  const data: Item[] = _data
  return data
}

export async function data_seed_post_insert(
  db: Drizzle_instance,
  post: Omit<z.infer<typeof Post_api_create_input>, "images"> & {
    user_id: number
    comments: { content: string; author_id: number }[]
    images?: { url: string }[]
  },
) {
  const images_created = post.images?.length
    ? await db.insert(Image).values(post.images).returning()
    : undefined

  const ctx = { user: { id: post.user_id }, db }
  const post_created = await Post_api_create(ctx, {
    ...post,
    images: images_created,
  })

  if (!post.comments?.length) return

  const comments_mapped = post.comments.map(c => ({
    ...c,
    post_id: post_created.id,
  }))
  await db.insert(Comment).values(comments_mapped)
}
