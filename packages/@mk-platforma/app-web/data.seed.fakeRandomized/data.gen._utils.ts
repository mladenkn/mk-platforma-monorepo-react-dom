import type { Category_label } from "~/domain/category/Category.types"

export type PostGenerator_context = {
  categories: { id: number; code: Category_label }[]
  locations: { id: number }[]
}
