import { Category_labelType } from "../prisma/generated/zod"
import { WithId } from "./data.gen.seed"

export type PostGeneratorParams = {
  categories: { id: number; label: Category_labelType }[]
  locations: WithId[]
}
