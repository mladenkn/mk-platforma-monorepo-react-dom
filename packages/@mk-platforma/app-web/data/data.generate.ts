import { faker } from "@faker-js/faker"
import { asNonNil, generateArray } from "@mk-libs/common/common"
import generateProducts from "./data.products"
import generateJobs from "./data.jobs"
import generateExpert from "./data.experts"
import generateGatheringsWork from "./data.gathering.work"
import generateAccomodations from "./data.accommodations"
import { WithId } from "./db.seed"
import { Post_category_labelType } from "../prisma/generated/zod"
import generateGatheringsHangout from "./data.gathering.hangout"

function data_common_generate(locations: WithId[]) {
  return {
    description: generateArray(() => "opis oglasa ", 30).join(""),
    location: faker.helpers.arrayElement(locations),
    contact: faker.helpers.arrayElement([faker.phone.number(), faker.internet.email()]),
    comments: generateArray(
      () => ({ content: generateArray(() => "komentar ", 20).join("") }),
      faker.datatype.number({ min: 0, max: 7 })
    ),
    title: faker.lorem.words(),
  }
}

export default function generatePosts(
  categories: (WithId & { label: Post_category_labelType })[],
  locations: WithId[]
) {
  const data = {
    experts: generateArray(() => {}, faker.datatype.number({ min: 10, max: 50 })).map(() => ({
      ...data_common_generate(locations),
      categories: [asNonNil(categories.find(c => c.label === "expertEndorsement"))],
      ...generateExpert(),
    })),
    jobs: generateJobs({ categories }).map(i => ({
      ...data_common_generate(locations),
      ...i,
    })),
    sellableItems: generateProducts({ categories }).map(i => ({
      ...data_common_generate(locations),
      ...i,
    })),
    gatherings_work: generateGatheringsWork({ categories }).map(i => ({
      ...data_common_generate(locations),
      ...i,
    })),
    gatherings_hangout: generateGatheringsHangout({ categories }).map(i => ({
      ...data_common_generate(locations),
      ...i,
    })),
    accommodations: generateAccomodations({ categories }).map(i => ({
      ...data_common_generate(locations),
      ...i,
    })),
  }

  return faker.helpers.shuffle(Object.values(data).flat())
}
