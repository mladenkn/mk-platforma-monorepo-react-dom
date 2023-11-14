import { asNonNil, generateArray } from "@mk-libs/common/common"
import { PostGenerator_context } from "./data.gen._utils"
import { faker } from "@faker-js/faker"
import { data_seed_post_insert_many, post_gen_base } from "./data.seed.fr.posts._utils"
import { Drizzle_instance } from "~/drizzle/drizzle.instance"

export default async function data_seed_fr_posts_products_demand(
  db: Drizzle_instance,
  ctx: PostGenerator_context,
) {
  const posts = generateArray(
    index => ({
      title: "Tražim neki proizvod " + index,
      categories: [asNonNil(ctx.categories.find(c => c.code === "sellable_demand"))],
      images: [],
    }),
    faker.datatype.number({ min: 4, max: 10 }),
  ).map(post => post_gen_base(ctx, post))
  await data_seed_post_insert_many(db, posts)
}
