import PostList_section from "../client/Post.list.section"
import { CategoryLabel } from "../data/data.types"
import { Api_ss } from "../trpc.router"
import { GetServerSidePropsContext } from "next/types"

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const category = query.category ? (query.category as CategoryLabel) : ("gathering" as "gathering")
  return {
    props: {
      selectedCategory: category,
      posts_initial: await Api_ss.post.many({ categories: [category] }),
    },
  }
}

export default PostList_section
