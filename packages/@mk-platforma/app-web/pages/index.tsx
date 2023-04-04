import PostList_section from "../client/Post.list.section"
import { Category } from "../data/data.types"
import { api_ss } from "../trpc.router"
import { GetServerSidePropsContext } from "next/types"

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const categories = [query.category] as Category[]
  return {
    props: {
      selectedCategory: query.category as Category,
      posts_initial: await api_ss.posts({ categories }),
    },
  }
}

export default PostList_section
