import PostList_section, { PostList_section_Props } from "../client/Post.list.section"
import type { Post_category_labelType } from "../prisma/generated/zod"
import { Api_ss } from "../trpc.server"
import { GetServerSidePropsContext } from "next/types"
import db from "../prisma/instance"
import { assertIsNonNil } from "@mk-libs/common/common"

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const category_label = query.category
    ? (query.category as Post_category_labelType)
    : ("gathering" as "gathering")
  const category = await db.post_category.findFirst({ where: { label: category_label } })
  assertIsNonNil(category)
  const api = Api_ss({ db, userId: 1 })
  const props: PostList_section_Props = {
    selectedCategory_initial: category,
    posts_initial: await api.post.many({ categories: [category.id] }),
    categories_initial: await api.post.category.many(),
  }
  return {
    props,
  }
}

export default PostList_section
