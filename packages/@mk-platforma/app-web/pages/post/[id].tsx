import { GetServerSidePropsContext } from "next/types"
import { typeCheck } from "@mk-libs/common/common"
import { ComponentProps } from "react"
import { Api_ss } from "~/api_/api.root"
import Post_single_page from "~/domain/post/Post.single.page"
import db from "~/prisma/instance"
import { user_ss_get } from "~/pages/api/auth/[...nextauth]"

export async function getServerSideProps({ query, req, res }: GetServerSidePropsContext) {
  const post_id = parseInt(query.id as string)
  const user_id = await user_ss_get(req, res)
  const post = await Api_ss({ db, user: user_id }).post.single({ id: post_id })

  if (post)
    return { props: typeCheck<ComponentProps<typeof Post_single_page>>({ post_initial: post }) }
  else return { notFound: true }
}

export default Post_single_page
