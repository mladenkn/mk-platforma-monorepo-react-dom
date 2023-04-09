import { faker } from "@faker-js/faker"
import data_images from "./data.images.json"
import { post_image_id_getNext } from "./data._utils"

const jobs = [
  {
    label: "Oranje vrta",
  },
  {
    label: "Obrezivanje maslina",
  },
  {
    label: "Zidanje zida",
  },
  {
    label: "Gradnja drvene kuće",
  },
  {
    label: "Izdrada ograde",
  },
  {
    label: "Izdrada web stranice",
  },
  {
    label: "Popravak cijevi u zidu",
  },
  {
    label: "Postavljanje izolacije",
  },
]

export default function generateJobs(item_getMoreData: () => Record<string, unknown> = () => ({})) {
  return faker.helpers.shuffle(jobs).map(({ label }) => ({
    ...item_getMoreData(),
    categories: ["job" as "job"],
    label,
    images: faker.helpers
      .arrayElements(
        data_images["posao selo kuća tesar zidar"],
        faker.datatype.number({ min: 1, max: 5 })
      )
      .map(url => ({ url, id: post_image_id_getNext() })),
  }))
}
