import { faker } from "@faker-js/faker"
import { generateArray } from "@mk-libs/common/common"
import * as cro_dataset from "./data.cro.dataset"
import data_images from "./data.images.json"

const hangouts = [
  {
    label: "Prekopavanje vrta",
  },
  {
    label: "Obrezivanje maslina",
  },
  {
    label: "Zidanje zida od cob materijala",
  },
  {
    label: "Kopanje rupa za voćke",
  },
  {
    label: "Gradnja drvene kuće",
  },
  {
    label: "Sadnja povrtnjaka",
  },
  {
    label: "Sadnja voćnjaka",
  },
  {
    label: "Izrada ograde od šiblja",
  },
]

export default function generateGatherings(){
  return faker.helpers.shuffle(hangouts).map(({ label }, index) => ({
    label,
    id: index + 1,
    description: generateArray(() => 'opis oglasa ', 30).join(''),
    location: faker.helpers.arrayElement([...cro_dataset.cities, ...cro_dataset.villages, ...cro_dataset.villages]),
    photos: faker.helpers.arrayElements(
      data_images['nature gathering action work'],
      faker.datatype.number({ min: 1, max: 6 })
    ),
    adOwner: {
      phoneNumber: faker.phone.number(),
    },
  }))
}
