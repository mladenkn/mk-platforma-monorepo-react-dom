import Post_list_page from "~/domain/post/Post.list.page"
import Post_list_page_props_initial_get from "~/domain/post/Post.list.page.data.initial"
import { create_get_ss_props_next } from "~/ss.props"

export const getServerSideProps = create_get_ss_props_next(Post_list_page_props_initial_get)
export default Post_list_page
