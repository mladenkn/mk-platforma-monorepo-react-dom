import { faker } from "@faker-js/faker"
import { asNonNil } from "@mk-libs/common/common"
import { PostGeneratorParams } from "./data.generate._utils"
import data_images from "./data.images.json"

const withRelatedProps = [
  {
    title: "Kućica na selu",
  },
  {
    title: "Soba u kućici na selu",
  },
  {
    title: "Stan u gradu",
  },
]

export default function generateAccomodations({ categories }: PostGeneratorParams) {
  return [...withRelatedProps, ...withRelatedProps].map(({ title }) => ({
    categories: [asNonNil(categories.find(c => c.label === "accommodation"))],
    title,
    images: faker.helpers
      .arrayElements(
        data_images["smještaj podstanarstvo kuća na seoskom imanju"],
        faker.datatype.number({ min: 1, max: 5 })
      )
      .map(url => ({ url })),
  }))
}
