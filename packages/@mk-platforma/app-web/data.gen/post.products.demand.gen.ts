import { asNonNil, generateArray } from "@mk-libs/common/common"
import { PostGeneratorParams } from "./data.gen._utils"
import { faker } from "@faker-js/faker"

export default function generate_products_demand({ categories }: PostGeneratorParams) {
  return generateArray(
    index => ({
      title: "Tražim neki proizvod " + index,
      categories: [asNonNil(categories.find(c => c.label === "sellable_demand"))],
    }),
    faker.datatype.number({ min: 4, max: 10 })
  )
}
