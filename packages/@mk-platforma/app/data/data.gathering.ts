import { faker } from "@faker-js/faker"
import { generateArray } from "@mk-libs/common/common"
import * as cro_dataset from "./data.cro.dataset"


const randomPhoto = () =>
  faker.helpers.arrayElement([
    faker.image.business,
    faker.image.food,
    faker.image.nature,
    faker.image.transport,
  ])()

const hangouts = [
  {
    label: "Prekopavanje vrta",
  },
  {
    label: "Obrezivanje maslina",
  },
  {
    label: "Zidanje zida",
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
    label: "Izdrada ograde",
  },
]

export default function generateGatherings(){
  return faker.helpers.shuffle(hangouts).map((item, index) => ({
    ...item,
    id: index + 1,
    description: generateArray(() => 'opis oglasa ', 30).join(''),
    location: faker.helpers.arrayElement(cro_dataset.cities),
    photos: generateArray(randomPhoto, 3),
    adOwner: {
      phoneNumber: faker.phone.number(),
    },
  }))
}