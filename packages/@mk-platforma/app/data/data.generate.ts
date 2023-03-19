import { faker } from "@faker-js/faker"
import { generateArray } from "@mk-libs/common/common"
import { writeFileSync } from "fs"
import generateProducts from "./data.products"
import generateJobs from "./data.jobs"
import generateExpert from "./data.experts"


const eventsOrJobs = generateJobs()

const data = {
  experts: generateArray((index) => ({ id: index + 1, ...generateExpert() }), faker.datatype.number({ min: 10, max: 50 })),

  jobs: faker.helpers.shuffle(eventsOrJobs),

  sellableItems: generateProducts(),

  gathering_workAction: faker.helpers.shuffle(
    eventsOrJobs.filter(e => !e.label.includes('Izdrada web stranice') && !e.label.toLowerCase().includes('šivanje'))
  ),
  gathering_hangout: faker.helpers.shuffle(
    eventsOrJobs.filter(e => !e.label.includes('Izdrada web stranice') && !e.label.toLowerCase().includes('šivanje'))
  ),
  gathering_spiritual: faker.helpers.shuffle(
    eventsOrJobs.filter(e => !e.label.includes('Izdrada web stranice') && !e.label.toLowerCase().includes('šivanje'))
  ),
}

writeFileSync("./data.json", JSON.stringify(data, null, 2))
