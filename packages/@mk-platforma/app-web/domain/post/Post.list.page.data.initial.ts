import { GetServerSidePropsContext } from "next/types"
import { Api_ss } from "~/my-api/api.root"
import { getCookie_ss } from "~/cookies"
import { user_id_ss_get } from "~/pages/api/auth/[...nextauth]"
import { Category_labelType } from "~/prisma/generated/zod"
import db from "~/prisma/instance"
import { PostList_section_Props } from "./Post.list.page"

export async function Post_list_page_data_initial({ query, req, res }: GetServerSidePropsContext) {
  const category_label = query.category ? (query.category as Category_labelType) : undefined

  const user_id = await user_id_ss_get(req, res)
  const category = category_label
    ? await db.category.findFirst({ where: { label: category_label } })
    : null
  const api = Api_ss({ db, user_id })

  const location = getCookie_ss(req.headers.cookie || "", "Post_list__location")
  const location_radius = getCookie_ss(req.headers.cookie || "", "Post_list__location_radius")

  const posts_initial = await api.post.list.fieldSet_main({
    categories: category ? [category.id] : undefined,
    location: location || undefined,
    location_radius: location_radius || undefined,
  })

  const props: PostList_section_Props = {
    selectedCategory_initial: category,
    posts_initial: posts_initial.items,
    categories_initial: await api.category.many(),
    location_initial: location || null,
    location_radius_initial: location_radius || null,
  }
  return { props }
}
