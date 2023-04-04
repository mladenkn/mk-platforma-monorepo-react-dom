import Post_details_section from "../../client/Post.details.section"
import { api_ss } from "../../trpc.router"
import { GetServerSidePropsContext } from "next/types"

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const post_id = parseInt(query.id as string)
  return {
    props: {
      post_initial: await api_ss.post_single({ id: post_id }),
    },
  }
}

export default Post_details_section
