import { castIf } from "@mk-libs/common/common"
import { Post_category_label } from "@prisma/client"
import { Post_expert } from "./data/data.types"

type WithCategories = { categories: Post_category_label }
export function isPersonEndorsement<TPost extends WithCategories>(item: TPost): item is any {
  return castIf<Post_expert>(item, item.categories[0] === "personEndorsement")
}
