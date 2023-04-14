import { faker } from "@faker-js/faker"
import data_images from "./data.images.json"

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

export default function generateJobs<TMoreData>(
  item_getMoreData: () => TMoreData = () => ({} as any)
) {
  return faker.helpers.shuffle(jobs).map(({ title }) => ({
    ...item_getMoreData(),
    title,
    images: faker.helpers
      .arrayElements(
        data_images["posao selo kuća tesar zidar"],
        faker.datatype.number({ min: 1, max: 5 })
      )
      .map(url => ({ url })),
  }))
}
