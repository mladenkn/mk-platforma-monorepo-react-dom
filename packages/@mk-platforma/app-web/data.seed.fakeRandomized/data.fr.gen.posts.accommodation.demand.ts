import { faker } from "@faker-js/faker"
import { asNonNil } from "@mk-libs/common/common"
import { PostGenerator_context } from "../data.seed.common/data.gen._utils"
import data_images from "./data.fr.gen.images.json"
import { data_initial_post_gen_base } from "../data.seed.common/data.seed.utils"

const withRelatedProps = [
  {
    title: "Tražim smještaj na selu",
  },
  {
    title: "Tražim stan u gradu",
  },
]

export default function data_fr_gen_posts_accommodation_demand(ctx: PostGenerator_context) {
  return [...withRelatedProps, ...withRelatedProps]
    .map(post => ({
      ...post,
      categories: [asNonNil(ctx.categories.find(c => c.code === "accommodation_demand"))],
      images: faker.helpers
        .arrayElements(
          data_images["smještaj podstanarstvo kuća na seoskom imanju"].filter(i => i),
          faker.datatype.number({ min: 1, max: 5 }),
        )
        .map(url => ({ url })),
    }))
    .map(post => data_initial_post_gen_base(ctx, post))
}
