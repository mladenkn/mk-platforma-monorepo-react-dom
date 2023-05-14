import Post_single_section from "../../client/Post.single.section"
import { Api_ss } from "../../api/api.root"
import { GetServerSidePropsContext } from "next/types"
import db from "../../prisma/instance"
import { user_id_ss_get } from "../api/auth/[...nextauth]"
import { typeCheck } from "@mk-libs/common/common"
import { ComponentProps } from "react"

export async function getServerSideProps({ query, req, res }: GetServerSidePropsContext) {
  const post_id = parseInt(query.id as string)
  const userId = await user_id_ss_get(req, res)
  const post = await Api_ss({
    db,
    userId,
  }).post.single({ id: post_id })

  if (post)
    return { props: typeCheck<ComponentProps<typeof Post_single_section>>({ post_initial: post }) }
  else return { notFound: true }
}

export default Post_single_section
