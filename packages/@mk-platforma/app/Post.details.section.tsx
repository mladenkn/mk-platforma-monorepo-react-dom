import { Post_common_details } from "./Post.details"
import { useRouter } from "next/router"
import Header from "./Header"
import { Box, Button, IconButton, SxProps, TextField } from "@mui/material"
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined"
import trpc from "./trpc"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import ClearIcon from "@mui/icons-material/Cancel"
import { useState } from "react"
import { Post_base } from "../api/data/data.types"
import use_Post_form_base from "./Post.form.base"
import use_Post_form_expertOnly from "./Post.form.expertOnly"
import CategoriesDropdown from "./Categories.dropdown"

export default function Post_details_section() {
  const router = useRouter()
  const itemId = parseInt(router.query.id as string)!
  const post = trpc.post_single.useQuery({ id: itemId })
  const [isEdit, setIsEdit] = useState(false)

  return (
    <Box>
      <Header
        right={
          <a href="/" style={{ textDecoration: "none" }}>
            <IconButton sx={{ display: "flex", gap: 1 }}>
              <Box sx={{ color: "white", fontSize: 20 }}>Oglasi</Box>
              <ListAltOutlinedIcon sx={{ color: "white" }} />
            </IconButton>
          </a>
        }
      />
      {!post.data ? <>Učitavanje...</> : <></>}
      {(post.data && !isEdit) ? (
        <Post_common_details
          {...post.data}
          sx={{ py: 3, pl: 3, pr: 2, }}
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
      ) : <></>}
      {(post.data && isEdit) ? <Post_edit sx={{ px: 2, }} post={post.data as any} onSubmit={() => {}} /> : <></>}
    </Box>
  )
}

function Post_edit({ post, onSubmit, sx, } : { post: Post_base, onSubmit: () => void, sx?: SxProps }){
  const form_base = use_Post_form_base({ initialValues: post })

  const form_expert = use_Post_form_expertOnly({})
  const form_expert_isActive = form_base.control.values.categories?.includes("personEndorsement")
  
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, ...sx }}>
      <Box sx={{ fontSize: 38, mb: 5, mt: 4, display: 'flex', justifyContent: 'space-between' }}>
        <Box>Uređivanje oglasa</Box>
        <IconButton sx={{ fontSize: 44, }} onClick={() => form_base.control.resetForm()}>
          <ClearIcon />
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
    </Box>
  )
}
