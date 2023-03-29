import { Post_common_details } from "./Post.common.listItem"
import { useRouter } from "next/router"
import Header from "./Header"
import { Box, Button, IconButton, TextField } from "@mui/material"
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined"
import trpc from "./trpc"
import EditIcon from "@mui/icons-material/Edit"
import { useState } from "react"
import { Post_base } from "../api/data/data.types"
import use_Post_form_base from "./Post.form.base"
import { eva } from "@mk-libs/common/common"
import use_Post_form_expertOnly from "./Post.form.expertOnly"
import SectionsDropdown from "./Sections.dropdown"

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
          {...(post.data as any)}
          label_right={
            <IconButton onClick={() => setIsEdit(true)}>
              <EditIcon />
            </IconButton>
          }
        />
      ) : <></>}
      {(post.data && isEdit) ? <Post_edit post={post.data as any} onSubmit={() => {}} /> : <></>}
    </Box>
  )
}

function Post_edit({ post, onSubmit, } : { post: Post_base, onSubmit: () => void, }){
  const form_base = use_Post_form_base({ initialValues: post })

  const sections = trpc.sections.useQuery()

  const form_expert = use_Post_form_expertOnly({})
  const form_expert_isActive = eva(() => {
    const selectedSection = sections.data?.filter(s => form_base.control.values.sections?.includes(s.id))
    return !!selectedSection?.some(s => s.categories.includes("personEndorsement"))
  })
  
  return (
    <Box sx={{ px: 3, display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={{ fontSize: 38, mb: 5, mt: 4, }}>Uređivanje oglasa</Box>
      <TextField {...form_base.components_props.label} />
      {sections.data && <SectionsDropdown {...form_base.components_props.section} sections={sections.data} />}
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
