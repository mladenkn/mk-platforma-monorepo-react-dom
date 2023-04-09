import { faker } from "@faker-js/faker"
import data_images from "./data.images.json"
import { post_image_id_getNext } from "./data._utils"

const withRelatedProps = [
  {
    label: "Kućica na selu",
  },
  {
    label: "Soba u kućici na selu",
  },
  {
    label: "Stan u gradu",
  },
]

export default function generateAccomodations(
  item_getMoreData: () => Record<string, unknown> = () => ({})
) {
  return [...withRelatedProps, ...withRelatedProps].map(({ label }) => ({
    ...item_getMoreData(),
    categories: ["accommodation" as "accommodation"],
    label,
    images: faker.helpers
      .arrayElements(
        data_images["smještaj podstanarstvo kuća na seoskom imanju"],
        faker.datatype.number({ min: 1, max: 5 })
      )
      .map(url => ({ url, id: post_image_id_getNext() })),
  }))
}
