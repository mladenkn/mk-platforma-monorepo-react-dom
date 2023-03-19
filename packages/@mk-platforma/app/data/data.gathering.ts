import { faker } from "@faker-js/faker"
import { generateArray } from "@mk-libs/common/common"
import * as cro_dataset from "./data.cro.dataset"
import data_images from "./data.images.json"


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
    label: "Zidanje zida od cob materijala",
    photos: [
      '/images/okupljanje,2.jpg',
      '/images/cob-1.jpg',
      '/images/cob-2.jpg',
    ]
  },
  {
    label: "Kopanje rupa za voćke",
    photos: [
      '/images/vrt,3.jpg',
      '/images/okupljanje,priroda,3.png',
    ],
  },
  {
    label: "Gradnja drvene kuće",
    photos: [
      '/images/okupljanje,1.jpg',
      '/images/drvena-kuca.jpg',
    ]
  },
  {
    label: "Sadnja povrtnjaka",
    photos: [
      '/images/vrt,4.jpg',
      '/images/okupljanje,priroda,4.png',
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
    label: "Izrada ograde od šiblja",
    photos: [
      '/images/okupljanje,priroda,2.jpg',
      '/images/ograda-od-siblja.jpg',
    ]
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
