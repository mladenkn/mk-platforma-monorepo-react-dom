import PostList_section, { PostList_section_Props } from "../client/Post.list.section"
import type { Category_labelType } from "../prisma/generated/zod"
import { Api_ss } from "../api/api.root"
import { GetServerSidePropsContext } from "next/types"
import db from "../prisma/instance"
import { getCookie_ss } from "../cookies"
import { useSession, signIn } from "next-auth/react"
import { Box, Button, Typography } from "@mui/material"
import { match } from "ts-pattern"

export async function getServerSideProps({ query, req }: GetServerSidePropsContext) {
  const category_label = query.category ? (query.category as Category_labelType) : undefined
  const category = category_label
    ? await db.category.findFirst({ where: { label: category_label } })
    : null
  const api = Api_ss({ db, userId: 1 })

  const location = getCookie_ss(req.headers.cookie || "", "Post_list__location")
  const location_radius = getCookie_ss(req.headers.cookie || "", "Post_list__location_radius")

  const posts_initial = await api.post.list.fieldSet_main({
    categories: category ? [category.id] : undefined,
    location: location || undefined,
    location_radius: location_radius || undefined,
  })

  const props: PostList_section_Props = {
    selectedCategory_initial: category,
    posts_initial,
    categories_initial: await api.category.many(),
    location_initial: location || null,
    location_radius_initial: location_radius || null,
  }
  return {
    props,
  }
}

export default function (props: PostList_section_Props) {
  const session = useSession()
  console.log(40, session)
  return match(session.status)
    .with("authenticated", () => <PostList_section {...props} />)
    .with("loading", () => <Box>Loading...</Box>)
    .with("unauthenticated", () => (
      <Box>
        <Typography>Niste prijavljeni</Typography>
        <Button onClick={() => signIn()}>Prijavite se ovdje</Button>
      </Box>
    ))
    .exhaustive()
}
