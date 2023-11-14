import { Drizzle_instance } from "~/drizzle/drizzle.instance"
import { data_seed_fr_categories } from "./data.seed.fr.categories"
import data_seed_fr_locations from "./data.seed.fr.locations"
import data_seed_fr_users from "./data.seed.fr.users"
import data_seed_fr_posts from "./data.seed.fr.posts"
import { withPerfLogging_async } from "@mk-libs/common/debug"

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
