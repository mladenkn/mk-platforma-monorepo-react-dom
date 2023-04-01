import PostList_section from "@mk-platforma/app/Post.list.section"
import { useRouter } from "next/router"
import { Category } from "../../api/data/data.types"

export default function () {
  const router = useRouter()
  const { name } = router.query
  const name_ = typeof name === "string" ? (name as Category) : undefined
  return <PostList_section initialTab={name_} />
}
