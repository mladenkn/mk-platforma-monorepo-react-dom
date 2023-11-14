import { faker } from "@faker-js/faker"
import { PostGenerator_context } from "./data.gen._utils"
import data_images from "./data.gen.images.json"
import { data_seed_post_insert_many, post_gen_base } from "./data.seed.fr.posts._utils"
import { Drizzle_instance } from "~/drizzle/drizzle.instance"

const withRelatedProps = [
  {
    title: "Zidanje od cob materijala",
  },
  {
    title: "Kopanje rupa za voćke",
  },
  {
    title: "Sadnja povrtnjaka",
  },
  {
    title: "Izrada ograde od šiblja",
  },
]

export default async function data_seed_fr_posts_gathering_work(
  db: Drizzle_instance,
  ctx: PostGenerator_context,
) {
  const posts = faker.helpers
    .shuffle(withRelatedProps)
    .map(post => ({
      ...post,
      categories: [ctx.categories.find(c => c.code === "gathering_work")!],
      images: faker.helpers
        .arrayElements(
          data_images["nature gathering action work"].filter(i => i),
          faker.datatype.number({ min: 1, max: 6 }),
        )
        .map(url => ({ url })),
    }))
    .map(post => post_gen_base(ctx, post))
  await data_seed_post_insert_many(db, posts)
}
