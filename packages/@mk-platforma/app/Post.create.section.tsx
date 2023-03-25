import { Box, IconButton, SxProps, TextField } from "@mui/material"
import Header from "./Header"
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined"
import use_Post_form_expertOnly from "./Post.form.expertOnly"
import CategoriesDropdown from "./Categories.dropdown"
import use_Post_form_base from "./Post.form.base"


type Props = {
  sx?: SxProps
}

export default function Post_create_section({ sx }: Props) {
  const form_base = use_Post_form_base({})

  const form_expert = use_Post_form_expertOnly({})
  const form_expert_isActive = form_base.control.values.categories.includes('personEndorsement')

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", ...sx }}>
      <Header
        sx={{ mb: 5 }}
        right={
          <a href="/" style={{ textDecoration: "none" }}>
            <IconButton sx={{ display: "flex", gap: 1 }}>
              <Box sx={{ color: "white", fontSize: 20 }}>Oglasi</Box>
              <ListAltOutlinedIcon sx={{ color: "white" }} />
            </IconButton>
          </a>
        }
      />
      <Box sx={{ px: 3, display: 'flex', flexDirection: 'column', gap: 2, }}>
        <Box sx={{ fontSize: 38, mb: 5 }}>Novi oglas</Box>
        <TextField {...form_base.components_props.label} />
        <CategoriesDropdown {...form_base.components_props.categories} />
        <TextField {...form_base.components_props.description} />
        <TextField {...form_base.components_props.location} />
        {form_expert_isActive ? (
          <>
            <TextField {...form_expert.components_props.firstName} />
            <TextField {...form_expert.components_props.lastName} />
            <TextField {...form_expert.components_props.skills} />
          </>
        ) : <></>}
      </Box>
    </Box>
  )
}
