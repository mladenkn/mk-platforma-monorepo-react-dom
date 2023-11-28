import { Drizzle_instance } from "~/drizzle/drizzle.instance"
import { data_fr_gen_categories } from "./data.seed.fr.categories"
import { withPerfLogging_async } from "@mk-libs/common/debug"
import data_seed_fr_locations from "./data.seed.fr.locations"
import data_fr_gen_users from "./data.seed.fr.users"
import data_seed_fr_posts_products from "./data.seed.fr.posts.products"
import data_seed_fr_posts_jobs from "./data.seed.fr.posts.jobs"
import data_seed_fr_posts_job_demand from "./data.seed.fr.posts.job.demand"
import data_seed_fr_posts_gathering_work from "./data.seed.fr.posts.gathering.work"
import data_seed_fr_posts_accommodation from "./data.seed.fr.posts.accommodation"
import data_seed_fr_posts_gathering_hangout from "./data.seed.fr.posts.gathering.hangout"
import data_seed_fr_posts_accommodation_demand from "./data.seed.fr.posts.accommodation.demand"
import data_seed_fr_posts_products_demand from "./data.seed.fr.posts.products.demand"
import { data_initial_categories_insert } from "~/data.seed.common/data.seed.fr.utils"
import { User } from "~/drizzle/drizzle.schema"
import { eva } from "@mk-libs/common/common"

const data_seed_fakeRandomized = withPerfLogging_async(async function _data_seed_fakeRandomized(
  db: Drizzle_instance,
) {
  const categories = await eva(async () => {
    await data_initial_categories_insert(db, data_fr_gen_categories())
    return await db.query.Category.findMany()
  })
  const locations = await data_seed_fr_locations(db)
  const users = await db.insert(User).values(data_fr_gen_users()).returning()

  const ctx = {
    categories,
    locations,
    users,
  }

  await Promise.all([
    data_seed_fr_posts_job_demand(db, ctx),
    data_seed_fr_posts_jobs(db, ctx),
    // data_seed_fr_posts_products(db, ctx),
    data_seed_fr_posts_gathering_work(db, ctx),
    data_seed_fr_posts_gathering_hangout(db, ctx),
    data_seed_fr_posts_accommodation(db, ctx),
    data_seed_fr_posts_accommodation_demand(db, ctx),
    data_seed_fr_posts_products_demand(db, ctx),
  ])
})

export default data_seed_fakeRandomized
