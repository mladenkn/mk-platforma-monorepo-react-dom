import { faker } from "@faker-js/faker"
import { asNonNil } from "@mk-libs/common/common"
import { PostGenerator_context } from "./data.gen._utils"
import data_images from "./data.gen.images.json"

const withRelatedProps = [
  {
    title: "Tražim smještaj na selu",
  },
  {
    title: "Tražim stan u gradu",
  },
]

export default function generate_accomodations_demand({ categories }: PostGenerator_context) {
  return [...withRelatedProps, ...withRelatedProps].map(({ title }) => ({
    categories: [asNonNil(categories.find(c => c.label === "accommodation_demand"))],
    title,
    images: faker.helpers
      .arrayElements(
        data_images["smještaj podstanarstvo kuća na seoskom imanju"].filter(i => i),
        faker.datatype.number({ min: 1, max: 5 }),
      )
      .map(url => ({ url })),
  }))
}
