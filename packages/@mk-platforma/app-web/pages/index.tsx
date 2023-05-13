import { GetServerSidePropsContext } from "next/types"
import { useSession, signIn } from "next-auth/react"
import { Box, Button, Typography } from "@mui/material"
import { match } from "ts-pattern"
import { Post_list_page_data_initial } from "../api/Post.list.page.data.initial"
import PostList_section, { PostList_section_Props } from "../client/Post.list.section"

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await Post_list_page_data_initial(ctx)
}

export default function (props: PostList_section_Props) {
  const session = useSession()
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
