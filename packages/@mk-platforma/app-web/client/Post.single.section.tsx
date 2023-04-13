import Post_single_details, { Post_common_listItem_details_PostModel } from "./Post.single.details"
import { useRouter } from "next/router"
import { Header_root, Header_moreOptions } from "./Header"
import { Box, Button, IconButton, SxProps, TextField, Paper, Typography } from "@mui/material"
import Api from "./trpc.client"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import CloseIcon from "@mui/icons-material/Close"
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined"
import { useState, ComponentProps } from "react"
import { asNonNil } from "@mk-libs/common/common"
import SaveIcon from "@mui/icons-material/Save"
import React from "react"
import Post_form_base from "./Post.form.base"

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
          post={nullsToUndefined(post)}
          onSubmit={() => {}}
          cancel={() => setIsEdit(false)}
        />
      ) : (
        <></>
      )}
    </Box>
  )
}

type RecursivelyReplaceNullWithUndefined<T> = T extends null
  ? undefined
  : T extends (infer U)[]
  ? RecursivelyReplaceNullWithUndefined<U>[]
  : T extends Record<string, unknown>
  ? { [K in keyof T]: RecursivelyReplaceNullWithUndefined<T[K]> }
  : T

export function nullsToUndefined<T>(obj: T): RecursivelyReplaceNullWithUndefined<T> {
  if (obj === null || obj === undefined) {
    return undefined as any
  }

  if ((obj as any).constructor.name === "Object" || Array.isArray(obj)) {
    for (const key in obj) {
      obj[key] = nullsToUndefined(obj[key]) as any
    }
  }
  return obj as any
}

function Post_edit({
  post,
  onSubmit,
  sx,
  cancel,
}: {
  post: ComponentProps<typeof Post_form_base>["initialValues"]
  onSubmit(): void
  sx?: SxProps
  cancel(): void
}) {
  return (
    <Paper sx={{ display: "flex", flexDirection: "column", gap: 2, ...sx }}>
      <Box sx={{ mb: 5, display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h2">Uredi oglasi</Typography>
        <IconButton onClick={cancel}>
          <CloseIcon fontSize="medium" />
        </IconButton>
      </Box>
      <Post_form_base initialValues={post} />
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
