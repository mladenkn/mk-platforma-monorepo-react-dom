import { Box, IconButton, SxProps, TextField, Button, Paper } from "@mui/material"
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
  const form_expert_isActive = form_base.control.values.categories?.includes("personEndorsement")

  function onSubmit() {}

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", ...sx }}>
      <Header
        sx={{ mb: 2 }}
        right={
          <a href="/" style={{ textDecoration: "none" }}>
            <IconButton sx={{ display: "flex", gap: 1 }}>
              <Box sx={{ color: "white", fontSize: 20 }}>Oglasi</Box>
              <ListAltOutlinedIcon sx={{ color: "white" }} />
            </IconButton>
          </a>
        }
      />
      <Paper sx={{ px: 3, display: "flex", flexDirection: "column", gap: 2, m: 1, p: 2 }}>
        <Box sx={{ fontSize: 38, mb: 3 }}>Novi oglas</Box>
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
          Dodaj
        </Button>
      </Paper>
    </Box>
  )
}
