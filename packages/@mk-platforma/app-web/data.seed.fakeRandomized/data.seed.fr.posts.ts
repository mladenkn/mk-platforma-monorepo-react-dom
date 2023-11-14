import { faker } from "@faker-js/faker"
import { data_seed_post_insert } from "./post.all.gen"
import { Drizzle_instance } from "~/drizzle/drizzle.instance"
import { Category, Location, User } from "~/drizzle/drizzle.schema"
import { PostGenerator_context } from "./data.gen._utils"
import generateProducts from "./post.products.gen"
import generateJobs from "./post.jobs.gen"
import generateExperts from "./post.job.demand.gen"
import generateGatheringsWork from "./post.gathering.work.gen"
import generateAccomodations from "./post.accommodation.gen"
import generateGatheringsHangout from "./post.gathering.hangout.gen"
import generate_accomodations_demand from "./post.accommodation.demand.gen"
import generate_products_demand from "./post.products.demand.gen"

export default async function data_seed_fr_posts(db: Drizzle_instance) {
  const categories = await db.select().from(Category)
  const locations = await db.select().from(Location)
  const users = await db.select().from(User)

  const posts = faker.helpers.shuffle(generatePosts({ categories, locations, users }))

  await Promise.all(
    posts.map(async post => {
      const user = faker.helpers.arrayElement(users)
      return await data_seed_post_insert(db, { ...post, user_id: user.id })
    }),
  )
}

function generatePosts(params: PostGenerator_context) {
  const _posts = [
    ...generateExperts(params),
    ...generateJobs(params),
    ...generateProducts(params),
    ...generateGatheringsWork(params),
    ...generateGatheringsHangout(params),
    ...generateAccomodations(params),
    ...generate_accomodations_demand(params),
    ...generate_products_demand(params),
  ]
  type Item = (typeof _posts)[number] & { images?: { url: string }[] }

  const posts: Item[] = _posts
  return posts
}
