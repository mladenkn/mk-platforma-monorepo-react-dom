import Post_single_details, { Post_common_listItem_details_PostModel } from "./Post.single.details"
import { useRouter } from "next/router"
import { Header_root, Header_moreOptions } from "./Header"
import { Box, Button, IconButton, SxProps, TextField, Paper, Typography } from "@mui/material"
import trpc from "./trpc"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import CloseIcon from "@mui/icons-material/Close"
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined"
import { useState } from "react"
import use_Post_form_base from "./Post.form.base"
import use_Post_form_expertOnly from "./Post.form.expertOnly"
import CategoryDropdown from "./Categories.dropdown"
import { asNonNil } from "@mk-libs/common/common"
import SaveIcon from "@mui/icons-material/Save"
import React from "react"

export default function Post_single_section({
  post_initial,
}: {
  post_initial: Post_common_listItem_details_PostModel
}) {
  const router = useRouter()
  const itemId = parseInt(router.query.id as string)!
  const postQuery = trpc.post.single.useQuery({ id: itemId }, { initialData: post_initial })
  const post = asNonNil(postQuery.data)
  const [isEdit, setIsEdit] = useState(false)
  const goBack = useRouter().back

  return (
    <Box>
      <Header_root sx={{ pr: 1.5 }}>
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
            <Typography variant="h3">ZaBrata</Typography>
            <Box sx={{ color: "white" }}>
              <Typography variant="h5">Loza kontribucionizma</Typography>
            </Box>
          </a>
        </Box>
        <Header_moreOptions options={["post.create", "profile", "post.list", "devContact"]} />
      </Header_root>
      {postQuery.isLoading ? <>Učitavanje...</> : <></>}
      {!isEdit ? (
        <Post_single_details
          sx={{ p: 1 }}
          {...post}
          usePaperSections
          title_right={
            <Box>
              <IconButton onClick={() => setIsEdit(true)}>
                <EditIcon />
              </IconButton>
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Box>
          }
        />
      ) : (
        <></>
      )}
      {post && isEdit ? (
        <Post_edit
          sx={{ p: 2, m: 1 }}
          post={post}
          onSubmit={() => {}}
          cancel={() => setIsEdit(false)}
        />
      ) : (
        <></>
      )}
    </Box>
  )
}

function Post_edit({
  post,
  onSubmit,
  sx,
  cancel,
}: {
  post: any
  onSubmit(): void
  sx?: SxProps
  cancel(): void
}) {
  const form_base = use_Post_form_base({ initialValues: post }) // nevalja

  const form_expert = use_Post_form_expertOnly({})
  const form_expert_isActive = form_base.control.values.categories?.includes("personEndorsement")

  return (
    <Paper sx={{ display: "flex", flexDirection: "column", gap: 2, ...sx }}>
      <Box sx={{ mb: 5, display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h2">Uredi oglasi</Typography>
        <IconButton onClick={cancel}>
          <CloseIcon fontSize="medium" />
        </IconButton>
      </Box>
      <TextField {...form_base.components_props.label} />
      <CategoryDropdown {...form_base.components_props.category} />
      <TextField {...form_base.components_props.description} />
      <TextField {...form_base.components_props.location} />
      <TextField {...form_base.components_props.contact} />
      {form_expert_isActive ? (
        <>
          <TextField {...form_expert.components_props.firstName} />
          <TextField {...form_expert.components_props.lastName} />
          <TextField {...form_expert.components_props.skills} />
        </>
      ) : (
        <></>
      )}
      <Button
        variant="contained"
        sx={{ mt: 4, display: "flex", alignItems: "center", gap: 1 }}
        onClick={onSubmit}
      >
        <SaveIcon />
        Spremi
      </Button>
    </Paper>
  )
}
