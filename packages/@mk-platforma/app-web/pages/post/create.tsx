import ss_props_get_create_full from "~/ss.props"
import Post_create_page from "../../domain/post/Post.create.page"

export const getServerSideProps = ss_props_get_create_full({ authenticate: true })

export default Post_create_page
