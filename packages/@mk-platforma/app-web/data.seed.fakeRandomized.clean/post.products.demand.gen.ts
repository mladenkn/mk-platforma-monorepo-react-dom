import { asNonNil, generateArray } from "@mk-libs/common/common"
import { PostGenerator_context } from "./data.gen._utils"
import { faker } from "@faker-js/faker"

export default function generate_products_demand({ categories }: PostGenerator_context) {
  return generateArray(
    index => ({
      title: "Tražim neki proizvod " + index,
      categories: [asNonNil(categories.find(c => c.code === "sellable_demand"))],
    }),
    faker.datatype.number({ min: 4, max: 10 }),
  )
}
