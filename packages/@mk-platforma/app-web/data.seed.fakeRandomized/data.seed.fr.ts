import { Drizzle_instance } from "~/drizzle/drizzle.instance"
import { data_fr_gen_categories } from "./data.seed.fr.categories"
import { withPerfLogging_async } from "@mk-libs/common/debug"
import data_fr_gen_users from "./data.seed.fr.users"
import data_seed_fr_posts_products from "./data.seed.fr.posts.products"
import data_seed_fr_posts_jobs from "./data.seed.fr.posts.jobs"
import data_seed_fr_posts_job_demand from "./data.seed.fr.posts.job.demand"
import data_seed_fr_posts_gathering_work from "./data.seed.fr.posts.gathering.work"
import data_seed_fr_posts_accommodation from "./data.seed.fr.posts.accommodation"
import data_seed_fr_posts_gathering_hangout from "./data.seed.fr.posts.gathering.hangout"
import data_seed_fr_posts_accommodation_demand from "./data.seed.fr.posts.accommodation.demand"
import data_seed_fr_posts_products_demand from "./data.seed.fr.posts.products.demand"
import {
  data_initial_categories_insert,
  data_initial_post_insert_many,
} from "~/data.seed.common/data.seed.fr.utils"
import { User } from "~/drizzle/drizzle.schema"
import { eva } from "@mk-libs/common/common"
import locations_json from "~/data.seed.common/data.locations.json"
import { Location } from "~/domain/post/Post.schema"

const data_seed_fakeRandomized = withPerfLogging_async(async function _data_seed_fakeRandomized(
  db: Drizzle_instance,
) {
  const categories = await eva(async () => {
    await data_initial_categories_insert(db, data_fr_gen_categories())
    return await db.query.Category.findMany()
  })
  const locations = await data_fr_gen_locations(db)
  const users = await db.insert(User).values(data_fr_gen_users()).returning()

  const ctx = {
    categories,
    locations,
    users,
  }

  const posts = [
    ...data_seed_fr_posts_job_demand(ctx),
    ...data_seed_fr_posts_jobs(ctx),
    // ...data_seed_fr_posts_products(db, ctx),
    ...data_seed_fr_posts_gathering_work(ctx),
    ...data_seed_fr_posts_gathering_hangout(ctx),
    ...data_seed_fr_posts_accommodation(ctx),
    ...data_seed_fr_posts_accommodation_demand(ctx),
    ...data_seed_fr_posts_products_demand(ctx),
  ]

  await data_initial_post_insert_many(db, posts)
})

export default data_seed_fakeRandomized

async function data_fr_gen_locations(db: Drizzle_instance) {
  const mapped = locations_json.map(l => ({ ...l, googleId: l.google_id }))
  return await db.insert(Location).values(mapped).returning() // TODO: fali onConflictDoUpdate
}
