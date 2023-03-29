import { z } from "zod"

export type Category =
  | "job"
  | "accommodation"
  | "personEndorsement"
  | "sellable"
  | "gathering"
  | "gathering/spirituality"
  | "gathering/work"
  | "gathering/hangout"

export const allCategories: Category[] = [
  "job",
  "accommodation",
  "personEndorsement",
  "sellable",
  "gathering",
  "gathering/spirituality",
  "gathering/work",
  "gathering/hangout",
]


export type Section = {
  id: number
  label: string
  iconName: Category
  categories: Category[]
}
