import { Post_list_page_data_initial } from "../api/Post.list.page.data.initial"
import Post_list_page from "../client/Post.list.page"

// export const getServerSideProps = create_getServerSideProps(Post_list_page_data_initial)
export const getServerSideProps = Post_list_page_data_initial
export default Post_list_page
