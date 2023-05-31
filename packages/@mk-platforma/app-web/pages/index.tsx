import Post_list_page from "~/domain/post/Post.list.page"
import Post_list_page_data_initial from "~/domain/post/Post.list.page.data.initial"

// export const getServerSideProps = create_getServerSideProps(Post_list_page_data_initial)
export const getServerSideProps = Post_list_page_data_initial
export default Post_list_page
