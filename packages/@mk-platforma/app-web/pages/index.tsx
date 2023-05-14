import { Post_list_page_data_initial } from "../api/Post.list.page.data.initial"
import PostList_section from "../client/Post.list.page"

// export const getServerSideProps = create_getServerSideProps(Post_list_page_data_initial)
export const getServerSideProps = Post_list_page_data_initial
export default PostList_section
