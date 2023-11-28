import { faker } from "@faker-js/faker"
import { PostGenerator_context } from "../data.seed.common/data.gen._utils"
import data_images from "./data.gen.images.json"
import { data_initial_post_gen_base } from "../data.seed.common/data.seed.fr.utils"

const withRelatedProps = [
  {
    title: "Druženje, proslava rođendana",
  },
  {
    title: "Proslava godišnjice mreže ZaBrata",
  },
]

export default function data_seed_fr_posts_gathering_hangout(ctx: PostGenerator_context) {
  return faker.helpers
    .shuffle(withRelatedProps)
    .map(post => ({
      ...post,
      categories: [ctx.categories.find(c => c.code === "gathering_hangout")!],
      images: faker.helpers
        .arrayElements(
          data_images["nature gathering action work"].filter(i => i),
          faker.datatype.number({ min: 1, max: 6 }),
        )
        .map(url => ({ url })),
    }))
    .map(post => data_initial_post_gen_base(ctx, post))
}
