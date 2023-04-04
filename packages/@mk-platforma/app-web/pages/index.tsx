import PostList_section from "../client/Post.list.section"
import { useRouter } from "next/router"
import { Category } from "../data/data.types"

export default function () {
  const { query, isReady } = useRouter()
  if (isReady) {
    const category = query.category ? (query.category as Category) : ("gathering" as "gathering")
    return <PostList_section initialTab={category} />
  } else return "Učitavanje..."
}
