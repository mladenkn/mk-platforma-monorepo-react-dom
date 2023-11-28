import { faker } from "@faker-js/faker"
import { asNonNil } from "@mk-libs/common/common"
import { PostGenerator_context } from "../data.seed.common/data.gen.utils"
import data_images from "./data.fr.gen.images.json"
import { data_initial_post_gen_base } from "../data.seed.common/data.seed.utils"

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

export default function data_fr_gen_posts_jobs(ctx: PostGenerator_context) {
  return jobs
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
}
