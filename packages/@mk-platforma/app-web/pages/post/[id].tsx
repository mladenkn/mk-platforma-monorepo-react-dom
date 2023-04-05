import Post_single_section from "../../client/Post.single.section"
import { Api_ss } from "../../trpc.router"
import { GetServerSidePropsContext } from "next/types"

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const post_id = parseInt(query.id as string)
  return {
    props: {
      post_initial: await Api_ss.post.single({ id: post_id }),
    },
  }
}

export default Post_single_section
