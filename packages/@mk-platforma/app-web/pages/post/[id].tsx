import Post_single_section from "../../client/Post.single.section"
import { api_ss } from "../../trpc.router"
import { GetServerSidePropsContext } from "next/types"

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const post_id = parseInt(query.id as string)
  return {
    props: {
      post_initial: await api_ss.posts.get_single({ id: post_id }),
    },
  }
}

export default Post_single_section
