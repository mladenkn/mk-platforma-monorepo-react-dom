import { asNonNil, generateArray } from "@mk-libs/common/common"
import { PostGenerator_context } from "./data.gen._utils"
import { faker } from "@faker-js/faker"
import { post_gen_base } from "./data.seed.fr.posts._utils"

export default function generate_products_demand(ctx: PostGenerator_context) {
  return generateArray(
    index => ({
      title: "Tražim neki proizvod " + index,
      categories: [asNonNil(ctx.categories.find(c => c.code === "sellable_demand"))],
      images: [],
    }),
    faker.datatype.number({ min: 4, max: 10 }),
  ).map(post => post_gen_base(ctx, post))
}
