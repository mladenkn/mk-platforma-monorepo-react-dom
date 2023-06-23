import { Category_labelType } from "~/prisma/generated/zod"
import { PostList_section_Props } from "./Post.list.page"
import { create_get_ss_props } from "~/ss.props"
import { z } from "zod"
import "@mk-libs/common/server-only"

const Post_list_page_props_initial_get = create_get_ss_props(
  {
    queryParams: z.object({ category: z.string().nullish() }),
  },
  async ({ api, getCookie }, params) => {
    const category_label = params.category ? (params.category as Category_labelType) : undefined

    const location = getCookie("Post_list__location")
    const location_radius = getCookie("Post_list__location_radius")

    const categories_all = await api.category.many()
    const category = categories_all.find(c => c.label === category_label)

    const posts_initial = await api.post.list.fieldSet_main({
      categories: category ? [category.id] : undefined,
      location: location || undefined,
      location_radius: location_radius || undefined,
    })

    const props: PostList_section_Props = {
      selectedCategory_initial: category ?? null,
      posts_initial: posts_initial.items,
      categories_initial: categories_all,
      location_initial: location || null,
      location_radius_initial: location_radius || null,
    }
    return { props }
  }
)

export default Post_list_page_props_initial_get
