import Post_list_page from "~/domain/post/Post.list.page"
import Post_list_page_data_initial from "~/domain/post/Post.list.page.data.initial"
import { create_get_ss_props_next } from "~/ss.props"

export const getServerSideProps = create_get_ss_props_next(Post_list_page_data_initial)
export default Post_list_page
