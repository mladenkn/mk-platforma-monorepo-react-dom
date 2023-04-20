import { Post_category_labelType } from "../prisma/generated/zod"
import { WithId } from "./db.seed"

export type PostGeneratorParams = {
  categories: { id: number; label: Post_category_labelType }[]
  locations: WithId[]
}
