import { Box, IconButton, SxProps, TextField, Button } from "@mui/material"
import Header from "./Header"
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined"
import use_Post_form_expertOnly from "./Post.form.expertOnly"
import SectionsDropdown from "./Sections.dropdown"
import use_Post_form_base from "./Post.form.base"
import { eva } from "@mk-libs/common/common"
import sections from "./data/data.sections"


type Props = {
  sx?: SxProps
}

export default function Post_create_section({ sx }: Props) {
  const form_base = use_Post_form_base({})

  const form_expert = use_Post_form_expertOnly({})
  const form_expert_isActive = eva(() => {
    const selectedSection = sections.find(s => form_base.control.values.section === s.id)
    return selectedSection ? selectedSection.categories.includes('personEndorsement') : false
  })

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
      <Box sx={{ px: 3, display: "flex", flexDirection: "column", gap: 2 }}>
        <Box sx={{ fontSize: 38, mb: 5 }}>Novi oglas</Box>
        <TextField {...form_base.components_props.label} />
        <SectionsDropdown {...form_base.components_props.section} />
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
        <Button variant="contained" sx={{ mt: 4 }}>Dodaj</Button>
      </Box>
    </Box>
  )
}
