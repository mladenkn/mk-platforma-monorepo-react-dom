import Post_single_page from "../../client/Post.single.page"
import { Api_ss } from "../../api/api.root"
import { GetServerSidePropsContext } from "next/types"
import db from "../../prisma/instance"
import { user_id_ss_get } from "../api/auth/[...nextauth]"
import { typeCheck } from "@mk-libs/common/common"
import { ComponentProps } from "react"

export async function getServerSideProps({ query, req, res }: GetServerSidePropsContext) {
  const post_id = parseInt(query.id as string)
  const user_id = await user_id_ss_get(req, res)
  const post = await Api_ss({ db, user_id }).post.single({ id: post_id })

  if (post)
    return { props: typeCheck<ComponentProps<typeof Post_single_page>>({ post_initial: post }) }
  else return { notFound: true }
}

export default Post_single_page
