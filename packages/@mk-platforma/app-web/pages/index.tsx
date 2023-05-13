import { GetServerSidePropsContext } from "next/types"
import { Post_list_page_data_initial } from "../api/Post.list.page.data.initial"
import PostList_section from "../client/Post.list.section"

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await Post_list_page_data_initial(ctx)
}

export default PostList_section
