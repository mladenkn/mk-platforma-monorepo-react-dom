import { Post_common_listItem_details } from "./Post.common.listItem"
import data from "./data/data.json"
import { useRouter } from 'next/router'
import { asNonNil } from "@mk-libs/common/common"


export default function Post_details_section(){
  const router = useRouter()
  const itemId = asNonNil(parseInt(router.query.id as string))
  const item = asNonNil(data.gatherings.find(g => g.id === itemId))
  return <Post_common_listItem_details {...item} />
}
