import { faker } from "@faker-js/faker"
import { generateArray } from "@mk-libs/common/common"
import * as cro_dataset from "./data.cro.dataset"
import data_images from "./data.images.json"
import { post_id_getNext } from "./data._utils"


const withRelatedProps = [
  { 
    label: 'Kućica na selu',
  },
  { 
    label: 'Soba u kućici na selu',
  },
  { 
    label: 'Stan u gradu',
  },
]

export const accommodations = [ ...withRelatedProps, ...withRelatedProps, ].map(({ label }) => ({
  type: 'accommodation' as 'accommodation',
  id: post_id_getNext(),
  label,
  description: generateArray(() => 'opis oglasa ', 30).join(''),
  location: faker.helpers.arrayElement([...cro_dataset.cities, ...cro_dataset.villages, ...cro_dataset.villages]),
  photos: faker.helpers.arrayElements(
    data_images['smještaj podstanarstvo kuća na seoskom imanju'],
    faker.datatype.number({ min: 1, max: 5 })
  ),
  phoneNumber: faker.phone.number(),
}))
