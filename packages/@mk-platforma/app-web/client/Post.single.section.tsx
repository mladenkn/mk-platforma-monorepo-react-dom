import Post_single_details, { Post_common_listItem_details_PostModel } from "./Post.single.details"
import { useRouter } from "next/router"
import { Header_root, Header_moreOptions } from "./Header"
import { Box, IconButton, Typography, Container } from "@mui/material"
import Api from "./trpc.client"
import EditIcon from "@mui/icons-material/Edit"
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined"
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
  const goBack = useRouter().back

  return (
    <Box>
      <Header_root sx={{ pr: 1.5 }}>
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pl: 1,
            pr: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "white",
              gap: 2,
            }}
          >
            <IconButton sx={{ color: "white" }} onClick={goBack}>
              <ArrowBackIosOutlinedIcon />
            </IconButton>
            <a style={{ color: "white", textDecoration: "none" }} href="/">
              <Typography variant="h3">Domaći oglasnik</Typography>
            </a>
          </Box>
          <Header_moreOptions options={["post.create", "profile", "post.list", "devContact"]} />
        </Container>
      </Header_root>
      <Container maxWidth="lg">
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
