import { faker } from "@faker-js/faker"
import { generateArray } from "@mk-libs/common/common"
import * as cro_dataset from "./data.cro.dataset"
import data_images from "./data.images.json"

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

export default function generateJobs(){
  return faker.helpers.shuffle(jobs).map(({ label }, index) => ({
    id: index + 1,
    label,
    description: generateArray(() => 'opis oglasa ', 30).join(''),
    location: faker.helpers.arrayElement([...cro_dataset.cities, ...cro_dataset.villages]),
    photos: faker.helpers.arrayElements(data_images["posao selo kuća tesar zidar"], faker.datatype.number({ min: 1, max: 5 })),
    adOwner: {
      phoneNumber: faker.phone.number(),
    },
  }))
}
