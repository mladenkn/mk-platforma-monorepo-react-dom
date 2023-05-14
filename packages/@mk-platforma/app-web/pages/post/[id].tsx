import Post_single_section from "../../client/Post.single.section"
import { Api_ss } from "../../api/api.root"
import { GetServerSidePropsContext } from "next/types"
import db from "../../prisma/instance"
import { user_id_ss_get_temp } from "../api/auth/[...nextauth]"

export async function getServerSideProps({ query, req, res }: GetServerSidePropsContext) {
  const post_id = parseInt(query.id as string)
  const userId = await user_id_ss_get_temp(req, res)
  return {
    props: {
      post_initial: await Api_ss({ db, userId }).post.single({ id: post_id }),
    },
  }
}

export default Post_single_section
