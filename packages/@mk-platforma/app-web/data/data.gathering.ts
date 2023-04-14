import { faker } from "@faker-js/faker"
import data_images from "./data.images.json"
import { post_image_id_getNext } from "./data._utils"

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
  {
    title: "Duhovno okupljanje, meditacija...",
  },
  {
    title: "Druženje, proslava rođendana",
  },
  {
    title: "Proslava godišnjice mreže ZaBrata",
  },
]

export default function generateGatherings<TMoreData>(
  item_getMoreData: () => TMoreData = () => ({} as any)
) {
  return faker.helpers.shuffle(withRelatedProps).map(({ title }) => ({
    ...item_getMoreData(),
    title,
    images: faker.helpers
      .arrayElements(
        data_images["nature gathering action work"],
        faker.datatype.number({ min: 1, max: 6 })
      )
      .map(url => ({ url, id: post_image_id_getNext() })),
  }))
}
