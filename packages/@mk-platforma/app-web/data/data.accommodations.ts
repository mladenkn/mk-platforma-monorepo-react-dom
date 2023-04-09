import { faker } from "@faker-js/faker"
import data_images from "./data.images.json"
import { post_image_id_getNext } from "./data._utils"

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

export default function generateAccomodations(
  item_getMoreData: () => Record<string, unknown> = () => ({})
) {
  return [...withRelatedProps, ...withRelatedProps].map(({ title }) => ({
    ...item_getMoreData(),
    categories: ["accommodation" as "accommodation"],
    title,
    images: faker.helpers
      .arrayElements(
        data_images["smještaj podstanarstvo kuća na seoskom imanju"],
        faker.datatype.number({ min: 1, max: 5 })
      )
      .map(url => ({ url, id: post_image_id_getNext() })),
  }))
}
