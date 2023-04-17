import { Post_category_labelType } from "../prisma/generated/zod"

export type ModelGeneratorParams = {
  categories: { id: number; label: Post_category_labelType }[]
}
