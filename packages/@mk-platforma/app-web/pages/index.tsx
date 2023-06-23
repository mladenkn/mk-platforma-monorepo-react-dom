import Post_list_page from "~/domain/post/Post.list.page"
import Post_list_page_props_initial_get from "~/domain/post/Post.list.page.data.initial"
import { ss_props_get_create_next } from "~/ss.props"

export const getServerSideProps = ss_props_get_create_next(Post_list_page_props_initial_get)
export default Post_list_page
