import { faker } from "@faker-js/faker"
import { asNonNil } from "@mk-libs/common/common"
import { PostGenerator_context } from "../data.seed.common/data.gen._utils"
import data_images from "./data.gen.images.json"
import {
  data_initial_post_insert_many,
  data_initial_post_gen_base,
} from "../data.seed.common/data.seed.fr.utils"
import { Drizzle_instance } from "~/drizzle/drizzle.instance"

const withRelatedProps = [
  {
    title: "Tražim smještaj na selu",
  },
  {
    title: "Tražim stan u gradu",
  },
]

export default async function data_seed_fr_posts_accommodation_demand(
  db: Drizzle_instance,
  ctx: PostGenerator_context,
) {
  const posts = [...withRelatedProps, ...withRelatedProps]
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
  await data_initial_post_insert_many(db, posts)
}
