import PostList_section from "../client/Post.list.section"
import { useRouter } from "next/router"
import { Category } from "../data/data.types"

export default function () {
  const router = useRouter()
  const { name } = router.query
  const name_ = typeof name === "string" ? (name as Category) : "gathering"
  return <PostList_section initialTab={name_} />
}
