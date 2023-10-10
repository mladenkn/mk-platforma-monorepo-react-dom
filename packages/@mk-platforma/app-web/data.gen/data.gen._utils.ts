import type { Category_label } from "~/domain/category/Category.types"
import { WithId } from "./data.gen.seed"

export type PostGeneratorParams = {
  categories: { id: number; label: Category_label }[]
  locations: WithId[]
}
