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
    photos: [
      '/images/vrt,1.jpg',
      '/images/okupljanje,priroda,1.jpg',
    ],
  },
  {
    label: "Obrezivanje maslina",
    photos: [
      '/images/vrt,2.jpg',
      '/images/okupljanje,priroda,2.jpg',
    ],
  },
  {
    label: "Zidanje zida",
  },
  {
    label: "Kopanje rupa za voćke",
    photos: [
      '/images/vrt,3.jpg',
      '/images/okupljanje,priroda,3.jpg',
    ],
  },
  {
    label: "Gradnja drvene kuće",
  },
  {
    label: "Sadnja povrtnjaka",
    photos: [
      '/images/vrt,4.jpg',
      '/images/okupljanje,priroda,4.jpg',
    ],
  },
  {
    label: "Sadnja voćnjaka",
    photos: [
      '/images/vrt,5.jpg',
      '/images/okupljanje,priroda,5.jpg',
    ],
  },
  {
    label: "Izdrada ograde",
  },
]

export default function generateGatherings(){
  return faker.helpers.shuffle(hangouts).map(({ label, photos, }, index) => ({
    label,
    id: index + 1,
    description: generateArray(() => 'opis oglasa ', 30).join(''),
    location: faker.helpers.arrayElement(cro_dataset.cities),
    photos: photos || generateArray(randomPhoto, 3),
    adOwner: {
      phoneNumber: faker.phone.number(),
    },
  }))
}
