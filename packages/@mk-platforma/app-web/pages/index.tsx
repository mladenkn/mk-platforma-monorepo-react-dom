import PostList_section from "../client/Post.list.section"
import { Category } from "../data/data.types"
import { api_ss } from "../trpc.router"
import { GetServerSidePropsContext } from "next/types"

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const category = query.category ? (query.category as Category) : ("gathering" as "gathering")
  return {
    props: {
      selectedCategory: category,
      posts_initial: await api_ss.posts({ categories: [category] }),
    },
  }
}

export default PostList_section
