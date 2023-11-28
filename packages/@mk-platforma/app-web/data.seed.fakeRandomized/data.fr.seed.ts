import { Drizzle_instance } from "~/drizzle/drizzle.instance"
import { withPerfLogging_async } from "@mk-libs/common/debug"
import data_fr_gen_categories from "./data.fr.gen.categories"
import data_fr_gen_users from "./data.fr..gen.users"
import data_fr_gen_posts_products from "./data.fr.gen.posts.products"
import data_fr_gen_posts_jobs from "./data.fr.gen.posts.jobs"
import data_fr_gen_posts_job_demand from "./data.fr.gen.posts.job.demand"
import data_fr_gen_posts_gathering_work from "./data.fr.gen.posts.gathering.work"
import data_fr_gen_posts_accommodation from "./data.fr.gen.posts.accommodation"
import data_fr_gen_posts_gathering_hangout from "./data.fr.gen.posts.gathering.hangout"
import data_fr_gen_posts_accommodation_demand from "./data.fr.gen.posts.accommodation.demand"
import data_fr_gen_posts_products_demand from "./data.fr.gen.posts.products.demand"
import {
  data_initial_categories_insert,
  data_initial_post_insert_many,
} from "~/data.seed.common/data.seed.utils"
import { User } from "~/drizzle/drizzle.schema"
import locations_json from "~/data.seed.common/data.locations.json"
import { Location } from "~/domain/post/Post.schema"
import { faker } from "@faker-js/faker"

const data_seed_fakeRandomized = withPerfLogging_async(async function _data_seed_fakeRandomized(
  db: Drizzle_instance,
) {
  await data_initial_categories_insert(db, data_fr_gen_categories())

  const categories = await db.query.Category.findMany()
  const locations = await data_fr_gen_locations(db)
  const users = await db.insert(User).values(data_fr_gen_users()).returning()

  const ctx = {
    categories,
    locations,
    users,
  }

  const posts = faker.helpers.shuffle([
    ...data_fr_gen_posts_job_demand(ctx),
    ...data_fr_gen_posts_jobs(ctx),
    // ...data_seed_fr_posts_products(db, ctx),
    ...data_fr_gen_posts_gathering_work(ctx),
    ...data_fr_gen_posts_gathering_hangout(ctx),
    ...data_fr_gen_posts_accommodation(ctx),
    ...data_fr_gen_posts_accommodation_demand(ctx),
    ...data_fr_gen_posts_products_demand(ctx),
  ])

  await data_initial_post_insert_many(db, posts)
})

export default data_seed_fakeRandomized

async function data_fr_gen_locations(db: Drizzle_instance) {
  const mapped = locations_json.map(l => ({ ...l, googleId: l.google_id }))
  return await db.insert(Location).values(mapped).returning() // TODO: fali onConflictDoUpdate
}
