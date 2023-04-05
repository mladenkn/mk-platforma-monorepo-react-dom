import { Post_single_details } from "./Post.single"
import { useRouter } from "next/router"
import { Header_root, Header_moreOptions } from "./Header"
import {
  Box,
  Button,
  IconButton,
  SxProps,
  TextField,
  Paper,
  Input,
  Typography,
  Avatar,
  useTheme,
} from "@mui/material"
import trpc from "./trpc"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import CloseIcon from "@mui/icons-material/Close"
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined"
import HandymanIcon from "@mui/icons-material/Handyman"
import { useState } from "react"
import type { Post_base, Post_expert } from "../data/data.types"
import use_Post_form_base from "./Post.form.base"
import use_Post_form_expertOnly from "./Post.form.expertOnly"
import CategoriesDropdown from "./Categories.dropdown"
import { asNonNil, castIf } from "@mk-libs/common/common"
import { Comment_listItem } from "./Comment.common"
import SaveIcon from "@mui/icons-material/Save"

export default function Post_single_section({ post_initial }: { post_initial: Post_base }) {
  const router = useRouter()
  const itemId = parseInt(router.query.id as string)!
  const postQuery = trpc.posts.get_single.useQuery({ id: itemId }, { initialData: post_initial })
  const post = asNonNil(postQuery.data)
  const [isEdit, setIsEdit] = useState(false)

  function renderAvatar(post: Post_base) {
    if (castIf<Post_expert>(post, post.categories[0] === "personEndorsement")) {
      return (
        <Avatar
          sx={{ mr: 2, ...post.avatarStyle }}
          children={post.firstName[0] + post.lastName[0]}
        />
      )
    }
  }

  const goBack = useRouter().back
  const { typography } = useTheme()

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
        <Box sx={{ p: 1 }}>
          <Paper sx={{ px: 2.5, py: 2, borderRadius: 2 }}>
            <Post_single_details
              {...post}
              label_left={
                <Box mr={1.2} display="flex" alignItems="center">
                  {renderAvatar(post)}
                </Box>
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
              afterDescription={
                castIf<Post_expert>(post, post.categories.includes("personEndorsement")) &&
                post.skills?.length ? (
                  <Box sx={{ mt: 4 }}>
                    <Box sx={{ display: "flex", alignItems: "start" }}>
                      <HandymanIcon sx={{ mt: 0.5, mr: 2, fontSize: typography.h5 }} />
                      <Box>
                        {post.skills.map(s => (
                          <Typography key={s.label}>
                            {s.label}
                            {` `}({s.level}/5)
                          </Typography>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                ) : undefined
              }
            />
          </Paper>
          <Paper sx={{ borderRadius: 2, p: 2, mt: 4, display: "flex" }}>
            <Avatar children="MK" sx={{ background: "blue", color: "white", mr: 2 }} />
            <Input sx={{ flex: 1 }} placeholder="Komentiraj" multiline />
          </Paper>
          {post.comments?.length ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}>
              {post.comments.map(comment => (
                <Paper key={comment.id} sx={{ p: 2, borderRadius: 2 }}>
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
  post: Post_base
  onSubmit(): void
  sx?: SxProps
  cancel(): void
}) {
  const form_base = use_Post_form_base({ initialValues: post })

  const form_expert = use_Post_form_expertOnly({})
  const form_expert_isActive = form_base.control.values.categories?.includes("personEndorsement")

  const goBack = useRouter().back

  return (
    <Paper sx={{ display: "flex", flexDirection: "column", gap: 2, ...sx }}>
      <Box sx={{ mb: 5, display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h2">Uredi oglasi</Typography>
        <IconButton onClick={cancel}>
          <CloseIcon fontSize="medium" />
        </IconButton>
      </Box>
      <TextField {...form_base.components_props.label} />
      <CategoriesDropdown {...form_base.components_props.section} />
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
