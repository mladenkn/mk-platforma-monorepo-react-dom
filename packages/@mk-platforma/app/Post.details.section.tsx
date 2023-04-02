import { Post_common_details } from "./Post.details"
import { useRouter } from "next/router"
import Header from "./Header"
import {
  Box,
  Button,
  IconButton,
  SxProps,
  TextField,
  Paper,
  Input,
  Typography,
  useTheme,
} from "@mui/material"
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined"
import trpc from "./trpc"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import ClearIcon from "@mui/icons-material/Cancel"
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined"
import { useState } from "react"
import type { Post_base, Post_expert } from "../api/data/data.types"
import use_Post_form_base from "./Post.form.base"
import use_Post_form_expertOnly from "./Post.form.expertOnly"
import CategoriesDropdown from "./Categories.dropdown"
import Avatar from "./Avatar"
import { castIf } from "@mk-libs/common/common"
import { Comment_listItem } from "./Comment.common"

export default function Post_details_section() {
  const router = useRouter()
  const itemId = parseInt(router.query.id as string)!
  const post = trpc.post_single.useQuery({ id: itemId })
  const [isEdit, setIsEdit] = useState(false)

  function renderAvatar(post: Post_base) {
    if (castIf<Post_expert>(post, post.categories[0] === "personEndorsement")) {
      return (
        <Avatar sx={{ mr: 2, ...post.avatarStyle }} letter={post.firstName[0] + post.lastName[0]} />
      )
    }
  }

  const goBack = useRouter().back

  const { typography } = useTheme()

  return (
    <Box>
      <Header
        right={
          <a href="/" style={{ textDecoration: "none" }}>
            <IconButton sx={{ display: "flex", gap: 1, alignItems: "start" }}>
              <Box sx={{ color: "white" }}>
                <Typography variant="h5">Oglasi</Typography>
              </Box>
              <ListAltOutlinedIcon fontSize="medium" sx={{ color: "white" }} />
            </IconButton>
          </a>
        }
      />
      {!post.data ? <>Učitavanje...</> : <></>}
      {post.data && !isEdit ? (
        <Box sx={{ p: 1 }}>
          <Paper sx={{ px: 2.5, py: 2, borderRadius: 2 }}>
            <Post_common_details
              {...post.data}
              label_left={
                <>
                  <IconButton sx={{ p: 0.5, mr: 1 }} onClick={goBack}>
                    <ArrowBackIosOutlinedIcon fontSize="medium" />
                  </IconButton>
                  {post.data && renderAvatar(post.data)}
                </>
              }
              label_right={
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
          </Paper>
          <Paper sx={{ borderRadius: 2, p: 2, mt: 4, display: "flex" }}>
            <Avatar letter="MK" sx={{ background: "blue", color: "white", mr: 2 }} />
            <Input sx={{ flex: 1 }} placeholder="Komentiraj" multiline />
          </Paper>
          {post.data.comments?.length ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}>
              {post.data.comments.map(comment => (
                <Paper sx={{ p: 2, borderRadius: 2 }}>
                  <Comment_listItem comment={comment} />
                </Paper>
              ))}
            </Box>
          ) : (
            <></>
          )}
        </Box>
      ) : (
        <></>
      )}
      {post.data && isEdit ? (
        <Post_edit sx={{ p: 2, m: 1 }} post={post.data as any} onSubmit={() => {}} />
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
}: {
  post: Post_base
  onSubmit: () => void
  sx?: SxProps
}) {
  const form_base = use_Post_form_base({ initialValues: post })

  const form_expert = use_Post_form_expertOnly({})
  const form_expert_isActive = form_base.control.values.categories?.includes("personEndorsement")

  return (
    <Paper sx={{ display: "flex", flexDirection: "column", gap: 2, ...sx }}>
      <Box sx={{ mb: 5, display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h2">Uređivanje oglasa</Typography>
        <IconButton onClick={() => form_base.control.resetForm()}>
          <ClearIcon fontSize="medium" />
        </IconButton>
      </Box>
      <TextField {...form_base.components_props.label} />
      <CategoriesDropdown {...form_base.components_props.section} />
      <TextField {...form_base.components_props.description} />
      <TextField {...form_base.components_props.location} />
      {form_expert_isActive ? (
        <>
          <TextField {...form_expert.components_props.firstName} />
          <TextField {...form_expert.components_props.lastName} />
          <TextField {...form_expert.components_props.skills} />
        </>
      ) : (
        <></>
      )}
      <Button variant="contained" sx={{ mt: 4 }} onClick={onSubmit}>
        Spremi
      </Button>
    </Paper>
  )
}
