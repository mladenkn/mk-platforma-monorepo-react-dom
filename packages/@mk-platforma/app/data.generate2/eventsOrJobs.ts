import { faker } from "@faker-js/faker"
import { generateArray } from "@mk-libs/common/common"
import * as cro_dataset from "../data.cro.dataset"

const randomJobPhoto = () =>
  faker.helpers.arrayElement([
    faker.image.business,
    faker.image.food,
    faker.image.nature,
    faker.image.transport,
  ])()

const jobs = [
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
  {
    label: "Šivanje haljine za maturu",
  },
  {
    label: "Izdrada web stranice",
  },
]

export default function generateEventsOrJobs(){
  return faker.helpers.shuffle(jobs).map(({ label }, index) => ({
    id: index + 1,
    label,
    description: generateArray(() => 'opis oglasa ', 30).join(''),
    location: faker.helpers.arrayElement(cro_dataset.cities),
    photos: generateArray(randomJobPhoto, 3),
    adOwner: {
      phoneNumber: faker.phone.number(),
    },
  }))
}