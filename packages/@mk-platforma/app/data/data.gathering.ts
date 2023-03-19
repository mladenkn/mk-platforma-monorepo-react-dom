import { faker } from "@faker-js/faker"
import { generateArray } from "@mk-libs/common/common"
import * as cro_dataset from "./data.cro.dataset"
import data_images from "./data.images.json"

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
    label: 'Duhovno okupljanje, meditacija...',
  },
  {
    label: 'Druženje, proslava rođendana',
  },
]

export default function generateGatherings(){
  return faker.helpers.shuffle(withRelatedProps).map(({ label }, index) => ({
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
