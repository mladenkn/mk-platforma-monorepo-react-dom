import Post_single_details, { Post_single_details_PostModel } from "./Post.single.details"
import { Header_full_common } from "./Header"
import { Box, IconButton, Typography } from "@mui/material"
import Api from "../api.client"
import EditIcon from "@mui/icons-material/Edit"
import { useState } from "react"
import { asNonNil, nullsToUndefinedDeep } from "@mk-libs/common/common"
import React from "react"
import Post_form from "./Post.form"
import Layout from "./Layout"

export default function Post_single_page({
  post_initial,
}: {
  post_initial: Post_single_details_PostModel
}) {
  const postQuery = Api.post.single.useQuery({ id: post_initial.id }, { initialData: post_initial })
  const post = asNonNil(postQuery.data)
  const [isEdit, setIsEdit] = useState(false)

  return (
    <Box>
      <Layout
        header={
          <Header_full_common
            moreOptions_props={{
              options: ["post.create", "profile", "post.list", "devContact"],
            }}
          />
        }
        content={
          <>
            {postQuery.isLoading ? <Typography>Učitavanje...</Typography> : <></>}
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
          </>
        }
      />
    </Box>
  )
}
