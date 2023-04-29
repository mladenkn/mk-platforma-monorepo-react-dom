import Post_single_details, { Post_common_listItem_details_PostModel } from "./Post.single.details"
import { useRouter } from "next/router"
import { Header_full_common } from "./Header"
import { Box, IconButton, Container } from "@mui/material"
import Api from "./trpc.client"
import EditIcon from "@mui/icons-material/Edit"
import { useState } from "react"
import { asNonNil, nullsToUndefinedDeep } from "@mk-libs/common/common"
import React from "react"
import Post_form from "./Post.form"

export default function Post_single_section({
  post_initial,
}: {
  post_initial: Post_common_listItem_details_PostModel
}) {
  const router = useRouter()
  const itemId = parseInt(router.query.id as string)!
  const postQuery = Api.post.single.useQuery({ id: itemId }, { initialData: post_initial })
  const post = asNonNil(postQuery.data)
  const [isEdit, setIsEdit] = useState(false)

  return (
    <Box>
      <Header_full_common />
      <Container sx={{ px: 0 }} maxWidth="lg">
        {postQuery.isLoading ? <>Učitavanje...</> : <></>}
        {!isEdit ? (
          <Post_single_details
            sx={{ p: 1 }}
            {...post}
            usePaperSections
            editAction={
              <IconButton onClick={() => setIsEdit(true)}>
                <EditIcon />
              </IconButton>
            }
          />
        ) : (
          <></>
        )}
        {post && isEdit ? (
          <Post_form
            sx={{ p: 2, m: 1 }}
            title="Uredi objavu"
            initialValues={nullsToUndefinedDeep(post)}
            onSubmit={() => {}}
            onCancel={() => setIsEdit(false)}
          />
        ) : (
          <></>
        )}
      </Container>
    </Box>
  )
}
