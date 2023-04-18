import { faker } from "@faker-js/faker"
import { asNonNil } from "@mk-libs/common/common"
import { ModelGeneratorParams } from "./data.generate._utils"
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

export default function generateJobs({ categories }: ModelGeneratorParams) {
  return faker.helpers.shuffle(jobs).map(({ title }) => ({
    categories: [asNonNil(categories.find(c => c.label === "job"))],
    title,
    images: faker.helpers
      .arrayElements(
        data_images["posao selo kuća tesar zidar"],
        faker.datatype.number({ min: 1, max: 5 })
      )
      .map(url => ({ url })),
  }))
}
