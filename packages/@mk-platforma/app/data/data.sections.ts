import { Category } from "./data.types"

export type Section = {
  id: number,
  label: string,
  iconName: Category,
  categories: Category[],
}
