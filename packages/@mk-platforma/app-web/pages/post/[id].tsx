import { typeCheck } from "@mk-libs/common/common"
import { ComponentProps } from "react"
import Post_details_page from "~/domain/post/Post.details.page"
import ss_props_get_create_full from "~/ss.props"
import { z } from "zod"

export const getServerSideProps = ss_props_get_create_full(
  { queryParams: z.object({ id: z.number() }) },
  async ({ api }, params) => {
    const post = await api.post.single({ id: params.id })
    if (post)
      return { props: typeCheck<ComponentProps<typeof Post_details_page>>({ post_initial: post }) }
    else return { notFound: true }
  },
)

export default Post_details_page
