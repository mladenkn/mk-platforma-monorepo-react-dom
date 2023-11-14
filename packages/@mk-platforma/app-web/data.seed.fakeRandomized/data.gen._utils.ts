import type { Category_code } from "~/domain/category/Category.types"

export type PostGenerator_context = {
  categories: { id: number; code: Category_code }[]
  locations: { id: number }[]
  users: { id: number }[]
}
