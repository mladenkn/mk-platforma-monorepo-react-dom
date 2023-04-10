import { castIf } from "@mk-libs/common/common"
import { Post_base, Post_expert } from "./data/data.types"

export function isPersonEndorsement(item: Post_base): item is Post_expert {
  return castIf<Post_expert>(item, item.categories[0] === "personEndorsement")
}
