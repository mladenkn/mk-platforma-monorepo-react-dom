import { faker } from "@faker-js/faker"
import { ModelGeneratorParams } from "./data.generate._utils"
import data_images from "./data.images.json"

const withRelatedProps = [
  {
    title: "Druženje, proslava rođendana",
  },
  {
    title: "Proslava godišnjice mreže ZaBrata",
  },
]

export default function generateGatheringsHangout({ categories }: ModelGeneratorParams) {
  return faker.helpers.shuffle(withRelatedProps).map(({ title }) => ({
    category: categories.find(c => c.label === "gathering_hangout"),
    title,
    images: faker.helpers
      .arrayElements(
        data_images["nature gathering action work"],
        faker.datatype.number({ min: 1, max: 6 })
      )
      .map(url => ({ url })),
  }))
}
