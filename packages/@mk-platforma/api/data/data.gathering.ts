import { faker } from "@faker-js/faker"
import { generateArray } from "@mk-libs/common/common"
import { generateComment } from "./data.common"
import * as cro_dataset from "./data.cro.dataset"
import data_images from "./data.images.json"
import { post_id_getNext } from "./data._utils"

const withRelatedProps = [
  {
    label: "Zidanje od cob materijala",
  },
  {
    label: "Kopanje rupa za voćke",
  },
  {
    label: "Sadnja povrtnjaka",
  },
  {
    label: "Izrada ograde od šiblja",
  },
  {
    label: "Duhovno okupljanje, meditacija...",
  },
  {
    label: "Druženje, proslava rođendana",
  },
  {
    label: "Proslava godišnjice mreže ZaBrata",
  },
]

export default function generateGatherings() {
  return faker.helpers.shuffle(withRelatedProps).map(({ label }) => ({
    categories: ["gathering" as "gathering"],
    id: post_id_getNext(),
    label,
    description: generateArray(() => "opis oglasa ", 30).join(""),
    location: faker.helpers.arrayElement([
      ...cro_dataset.cities,
      ...cro_dataset.villages,
      ...cro_dataset.villages,
    ]),
    images: faker.helpers.arrayElements(
      data_images["nature gathering action work"],
      faker.datatype.number({ min: 1, max: 6 })
    ),
    phoneNumber: faker.phone.number(),
    comments: generateArray(generateComment, faker.datatype.number({ min: 0, max: 7 })),
  }))
}
