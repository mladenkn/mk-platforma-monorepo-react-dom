import create_get_ss_props from "~/ss.props"
import Post_create_page from "../../domain/post/Post.create.page"

export const getServerSideProps = create_get_ss_props({ authenticate: true })

export default Post_create_page
