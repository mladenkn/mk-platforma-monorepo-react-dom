import { faker } from "@faker-js/faker"
import { asNonNil } from "@mk-libs/common/common"
import { PostGenerator_context } from "../data.seed.common/data.gen._utils"
import data_images from "./data.gen.images.json"
import {
  data_initial_post_insert_many,
  data_initial_post_gen_base,
} from "../data.seed.common/data.seed.fr.utils"
import { Drizzle_instance } from "~/drizzle/drizzle.instance"

const jobs = [
  {
    title: "Oranje vrta",
  },
  {
    title: "Obrezivanje maslina",
  },
  {
    title: "Zidanje zida",
  },
  {
    title: "Gradnja drvene kuće",
  },
  {
    title: "Izdrada ograde",
  },
  {
    title: "Izdrada web stranice",
  },
  {
    title: "Popravak cijevi u zidu",
  },
  {
    title: "Postavljanje izolacije",
  },
]

export default async function data_seed_fr_posts_jobs(
  db: Drizzle_instance,
  ctx: PostGenerator_context,
) {
  const posts = faker.helpers
    .shuffle(jobs)
    .map(post => ({
      ...post,
      categories: [asNonNil(ctx.categories.find(c => c.code === "job"))],
      images: faker.helpers
        .arrayElements(
          data_images["posao selo kuća tesar zidar"].filter(i => i),
          faker.datatype.number({ min: 1, max: 5 }),
        )
        .map(url => ({ url })),
    }))
    .map(post => data_initial_post_gen_base(ctx, post))
  await data_initial_post_insert_many(db, posts)
}
