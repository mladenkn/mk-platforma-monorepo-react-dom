import { faker } from "@faker-js/faker"
import { PostGenerator_context } from "./data.gen._utils"
import data_images from "./data.gen.images.json"
import { post_gen_base } from "./post.all.gen"

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

export default function generateGatheringsWork(ctx: PostGenerator_context) {
  return faker.helpers
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
}
