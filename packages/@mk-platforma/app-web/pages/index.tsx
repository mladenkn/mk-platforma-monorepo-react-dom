import PostList_section from "../client/Post.list.section"
import type { Post_category_labelType } from "../prisma/generated/zod"
import { Api_ss } from "../trpc.router"
import { GetServerSidePropsContext } from "next/types"
import db from "../prisma/instance"

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const category = query.category
    ? (query.category as Post_category_labelType)
    : ("gathering" as "gathering")
  return {
    props: {
      selectedCategory: category,
      posts_initial: await Api_ss({ db, userId: 1 }).post.many({ categories: [category] }),
    },
  }
}

export default PostList_section
