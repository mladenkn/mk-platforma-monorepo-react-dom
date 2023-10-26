import { faker } from "@faker-js/faker"
import { asNonNil } from "@mk-libs/common/common"
import { PostGenerator_context } from "./data.gen._utils"
import data_images from "./data.gen.images.json"

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

export default function generateAccomodations({ categories }: PostGenerator_context) {
  return [...withRelatedProps, ...withRelatedProps].map(({ title }) => ({
    categories: [asNonNil(categories.find(c => c.label === "accommodation"))],
    title,
    images: faker.helpers
      .arrayElements(
        data_images["smještaj podstanarstvo kuća na seoskom imanju"].filter(i => i),
        faker.datatype.number({ min: 1, max: 5 }),
      )
      .map(url => ({ url })),
  }))
}
