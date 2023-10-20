import type { Category_label } from "~/domain/category/Category.types"

export type PostGeneratorParams = {
  categories: { id: number; label: Category_label }[]
  locations: { id: number }[]
}
