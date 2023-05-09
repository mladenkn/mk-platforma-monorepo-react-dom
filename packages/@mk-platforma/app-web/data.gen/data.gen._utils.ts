import { Category_labelType } from "../prisma/generated/zod"
import { WithId } from "./db.seed"

export type PostGeneratorParams = {
  categories: { id: number; label: Category_labelType }[]
  locations: WithId[]
}
