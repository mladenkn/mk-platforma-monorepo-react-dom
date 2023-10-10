import { faker } from "@faker-js/faker"
import { PostGeneratorParams } from "./data.gen._utils"
import data_images from "./data.gen.images.json"

const withRelatedProps = [
  {
    title: "Druženje, proslava rođendana",
  },
  {
    title: "Proslava godišnjice mreže ZaBrata",
  },
]

export default function generateGatheringsHangout({ categories }: PostGeneratorParams) {
  return faker.helpers.shuffle(withRelatedProps).map(({ title }) => ({
    categories: [categories.find(c => c.label === "gathering_hangout")!],
    title,
    images: faker.helpers
      .arrayElements(
        data_images["nature gathering action work"],
        faker.datatype.number({ min: 1, max: 6 }),
      )
      .map(url => ({ url })),
  }))
}
