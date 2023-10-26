import { faker } from "@faker-js/faker"
import { PostGenerator_context } from "./data.gen._utils"
import data_images from "./data.gen.images.json"

const withRelatedProps = [
  {
    title: "Druženje, proslava rođendana",
  },
  {
    title: "Proslava godišnjice mreže ZaBrata",
  },
]

export default function generateGatheringsHangout({ categories }: PostGenerator_context) {
  return faker.helpers.shuffle(withRelatedProps).map(({ title }) => ({
    categories: [categories.find(c => c.label === "gathering_hangout")!],
    title,
    images: faker.helpers
      .arrayElements(
        data_images["nature gathering action work"].filter(i => i),
        faker.datatype.number({ min: 1, max: 6 }),
      )
      .map(url => ({ url })),
  }))
}
