import PostList_section, { PostList_section_Props } from "../client/Post.list.section"
import type { Post_category_labelType } from "../prisma/generated/zod"
import { Api_ss } from "../trpc.server"
import { GetServerSidePropsContext } from "next/types"
import db from "../prisma/instance"
import { getCookie_ss } from "../cookies2"

export async function getServerSideProps({ query, req }: GetServerSidePropsContext) {
  const category_label = query.category ? (query.category as Post_category_labelType) : undefined
  const category = category_label
    ? await db.post_category.findFirst({ where: { label: category_label } })
    : null
  const api = Api_ss({ db, userId: 1 })

  const location = getCookie_ss(req.headers.cookie || "", "Post_list__location")
  const location_radius = getCookie_ss(req.headers.cookie || "", "Post_list__location_radius")
  const posts_initial = await api.post.list.fieldSet_main({
    categories: category ? [category.id] : undefined,
    location: location || undefined,
    location_radius: location_radius || undefined,
  })

  const props: PostList_section_Props = {
    selectedCategory_initial: category,
    posts_initial,
    categories_initial: await api.post.category.many(),
    location_initial: location || null,
    location_radius_initial: location_radius || null,
  }
  return {
    props,
  }
}

export default PostList_section
