import { z } from "zod"

export const Category_code_zod = z.enum([
  "job",
  "job_demand",
  "accommodation",
  "accommodation_demand",
  "sellable",
  "sellable_demand",
  "sellable_food",
  "sellable_clothes",
  "sellable_furniture",
  "sellable_tool",
  "sellable_gadget",
  "sellable_buildingMaterial",
  "gathering",
  "gathering_spirituality",
  "gathering_work",
  "gathering_hangout",
])

export type Category_code = z.infer<typeof Category_code_zod>
