import { faker } from "@faker-js/faker"
import { PostGeneratorParams } from "./data.gen._utils"
import data_images from "./images.gen.json"

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

export default function generateGatheringsWork({ categories }: PostGeneratorParams) {
  return faker.helpers.shuffle(withRelatedProps).map(({ title }) => ({
    categories: [categories.find(c => c.label === "gathering_work")!],
    title,
    images: faker.helpers
      .arrayElements(
        data_images["nature gathering action work"],
        faker.datatype.number({ min: 1, max: 6 })
      )
      .map(url => ({ url })),
  }))
}
