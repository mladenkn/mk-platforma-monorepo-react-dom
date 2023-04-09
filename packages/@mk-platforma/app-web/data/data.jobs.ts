import { faker } from "@faker-js/faker"
import data_images from "./data.images.json"
import { post_image_id_getNext } from "./data._utils"

const jobs = [
  {
    title: "Oranje vrta",
  },
  {
    title: "Obrezivanje maslina",
  },
  {
    title: "Zidanje zida",
  },
  {
    title: "Gradnja drvene kuće",
  },
  {
    title: "Izdrada ograde",
  },
  {
    title: "Izdrada web stranice",
  },
  {
    title: "Popravak cijevi u zidu",
  },
  {
    title: "Postavljanje izolacije",
  },
]

export default function generateJobs(item_getMoreData: () => Record<string, unknown> = () => ({})) {
  return faker.helpers.shuffle(jobs).map(({ title }) => ({
    ...item_getMoreData(),
    categories: ["job" as "job"],
    title,
    images: faker.helpers
      .arrayElements(
        data_images["posao selo kuća tesar zidar"],
        faker.datatype.number({ min: 1, max: 5 })
      )
      .map(url => ({ url, id: post_image_id_getNext() })),
  }))
}
