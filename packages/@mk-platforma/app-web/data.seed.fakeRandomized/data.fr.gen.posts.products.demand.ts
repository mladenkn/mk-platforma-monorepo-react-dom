import { asNonNil, generateArray } from "@mk-libs/common/common"
import { PostGenerator_context } from "../data.seed.common/data.gen._utils"
import { faker } from "@faker-js/faker"
import { data_initial_post_gen_base } from "../data.seed.common/data.seed.utils"

export default function data_fr_gen_posts_products_demand(ctx: PostGenerator_context) {
  return generateArray(
    index => ({
      title: "Tražim neki proizvod " + index,
      categories: [asNonNil(ctx.categories.find(c => c.code === "sellable_demand"))],
      images: [],
    }),
    faker.datatype.number({ min: 4, max: 10 }),
  ).map(post => data_initial_post_gen_base(ctx, post))
}
