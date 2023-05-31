import { getCookie_ss } from "~/cookies"
import { Category_labelType } from "~/prisma/generated/zod"
import { PostList_section_Props } from "./Post.list.page"
import create_get_ss_props from "~/ss.props"
import { z } from "zod"

const Post_list_page_data_initial = create_get_ss_props(
  {
    queryParams: z.object({ category: z.string().nullish() }),
  },
  async ({ api, db }, params, nextContext) => {
    const category_label = params.category ? (params.category as Category_labelType) : undefined

    const category = category_label
      ? await db.category.findFirst({ where: { label: category_label } })
      : null

    const location = getCookie_ss(nextContext.req.headers.cookie || "", "Post_list__location")
    const location_radius = getCookie_ss(
      nextContext.req.headers.cookie || "",
      "Post_list__location_radius"
    )

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
)

export default Post_list_page_data_initial
