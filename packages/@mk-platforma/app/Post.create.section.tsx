import { Box, IconButton, SxProps, TextField, Button } from "@mui/material"
import Header from "./Header"
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined"
import use_Post_form_expertOnly from "./Post.form.expertOnly"
import SectionsDropdown from "./Sections.dropdown"
import use_Post_form_base from "./Post.form.base"
import { asNonNil, eva } from "@mk-libs/common/common"
import sections from "./data/data.sections"
import { flatMap, omit, uniq } from "lodash"

type Props = {
  sx?: SxProps
}

export default function Post_create_section({ sx }: Props) {
  const form_base = use_Post_form_base({})

  const form_expert = use_Post_form_expertOnly({})
  const form_expert_isActive = eva(() => {
    const selectedSection = sections.filter(s => form_base.control.values.sections?.includes(s.id))
    return !!selectedSection.some(s => s.categories.includes("personEndorsement"))
  })

  function onSubmit() {
    const mapped = {
      ...omit(form_base.control.values, "section"),
      categories: asNonNil(
        uniq(
          flatMap(
            sections.filter(s => form_base.control.values.sections?.includes(s.id)),
            s => s.categories
          )
        )
      ),
    }
  }

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
        <Button variant="contained" sx={{ mt: 4 }} onClick={onSubmit}>
          Dodaj
        </Button>
      </Box>
    </Box>
  )
}
