import { faker } from "@faker-js/faker"
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

export default function generateAccomodations<TMoreData>(
  item_getMoreData: () => TMoreData = () => ({} as any)
) {
  return [...withRelatedProps, ...withRelatedProps].map(({ title }) => ({
    ...item_getMoreData(),
    title,
    images: faker.helpers
      .arrayElements(
        data_images["smještaj podstanarstvo kuća na seoskom imanju"],
        faker.datatype.number({ min: 1, max: 5 })
      )
      .map(url => ({ url })),
  }))
}
