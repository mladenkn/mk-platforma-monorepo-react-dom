import { typeCheck } from "@mk-libs/common/common"
import { ComponentProps } from "react"
import Post_edit_page from "~/domain/post/Post.edit.page"
import ss_props_get_create_full from "~/ss.props"
import { z } from "zod"

export const getServerSideProps = ss_props_get_create_full(
  {
    authenticate: true,
    authorize: ({ user }) => !!user?.canMutate, // TODO: treba da nemože onaj čiji post nije
    queryParams: z.object({ id: z.number() }),
  },
  async ({ api }, params) => {
    const post = await api.post.single({ id: params.id })
    if (post)
      return { props: typeCheck<ComponentProps<typeof Post_edit_page>>({ post_initial: post }) }
    else return { notFound: true }
  },
)

export default Post_edit_page
