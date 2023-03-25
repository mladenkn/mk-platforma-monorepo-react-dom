import { Box, IconButton, SxProps, TextField } from "@mui/material"
import Header from "./Header"
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined"
import use_Post_form from "./Post.form"
import CategoriesDropdown from "./Categories.dropdown"

type Props = {
  sx?: SxProps
}

export default function Post_create_section({ sx }: Props) {
  const form = use_Post_form({  })

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
        <TextField {...form.baseForm.components_props.label} />
        <CategoriesDropdown {...form.baseForm.components_props.categories} />
        <TextField {...form.baseForm.components_props.description} />
        <TextField {...form.baseForm.components_props.location} />
        {form.expertForm.isActive ? (
          <>
            <TextField {...form.expertForm.components_props.firstName} />
            <TextField {...form.expertForm.components_props.lastName} />
            <TextField {...form.expertForm.components_props.skills} />
          </>
        ) : <></>}
      </Box>
    </Box>
  )
}
