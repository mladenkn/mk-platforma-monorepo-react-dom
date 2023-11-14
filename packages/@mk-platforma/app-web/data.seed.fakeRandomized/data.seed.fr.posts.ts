import { faker } from "@faker-js/faker"
import { data_seed_post_insert } from "./data.seed.fr.posts._utils"
import { Drizzle_instance } from "~/drizzle/drizzle.instance"
import { Category, Location, User } from "~/drizzle/drizzle.schema"
import { PostGenerator_context } from "./data.gen._utils"
import generateProducts from "./data.seed.fr.posts.products"
import generateJobs from "./data.seed.fr.posts.jobs"
import generateExperts from "./data.seed.fr.posts.job.demand"
import generateGatheringsWork from "./data.seed.fr.posts.gathering.work"
import generateAccomodations from "./data.seed.fr.posts.accommodation"
import generateGatheringsHangout from "./data.seed.fr.posts.gathering.hangout"
import generate_accomodations_demand from "./data.seed.fr.posts.accommodation.demand"
import generate_products_demand from "./data.seed.fr.posts.products.demand"

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
