import { Drizzle_instance } from "~/drizzle/drizzle.instance"
import { data_seed_fr_categories } from "./data.seed.fr.categories"
import data_seed_fr_locations from "./data.seed.fr.locations"
import data_seed_fr_users from "./data.seed.fr.users"
import { withPerfLogging_async } from "@mk-libs/common/debug"
import { Category, Location, User } from "~/drizzle/drizzle.schema"
import data_seed_fr_posts_products from "./data.seed.fr.posts.products"
import data_seed_fr_posts_jobs from "./data.seed.fr.posts.jobs"
import data_seed_fr_posts_job_demand from "./data.seed.fr.posts.job.demand"
import data_seed_fr_posts_gathering_work from "./data.seed.fr.posts.gathering.work"
import data_seed_fr_posts_accommodation from "./data.seed.fr.posts.accommodation"
import data_seed_fr_posts_gathering_hangout from "./data.seed.fr.posts.gathering.hangout"
import data_seed_fr_posts_accommodation_demand from "./data.seed.fr.posts.accommodation.demand"
import data_seed_fr_posts_products_demand from "./data.seed.fr.posts.products.demand"

const data_seed_fakeRandomized = withPerfLogging_async(async function _data_seed_fakeRandomized(
  db: Drizzle_instance,
) {
  await Promise.all([
    data_seed_fr_categories(db),
    data_seed_fr_locations(db),
    data_seed_fr_users(db),
  ])
  await data_seed_fr_posts(db)
})

export default data_seed_fakeRandomized

async function data_seed_fr_posts(db: Drizzle_instance) {
  const categories = await db.select().from(Category)
  const locations = await db.select().from(Location)
  const users = await db.select().from(User)

  const ctx = { categories, locations, users }

  await Promise.all([
    data_seed_fr_posts_job_demand(db, ctx),
    data_seed_fr_posts_jobs(db, ctx),
    data_seed_fr_posts_products(db, ctx),
    data_seed_fr_posts_gathering_work(db, ctx),
    data_seed_fr_posts_gathering_hangout(db, ctx),
    data_seed_fr_posts_accommodation(db, ctx),
    data_seed_fr_posts_accommodation_demand(db, ctx),
    data_seed_fr_posts_products_demand(db, ctx),
  ])
}
