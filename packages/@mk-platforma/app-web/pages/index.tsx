import PostList_section from "../client/Post.list.section"
import { useRouter } from "next/router"
import { Category } from "../data/data.types"

export default function () {
  const router = useRouter()
  const { category } = router.query
  const category_ = typeof category === "string" ? (category as Category) : "gathering"
  return <PostList_section initialTab={category_} />
}
