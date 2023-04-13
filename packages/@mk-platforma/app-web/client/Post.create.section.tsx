import { Box, IconButton, SxProps, TextField, Button, Paper, Typography } from "@mui/material"
import use_Post_form_expertOnly from "./Post.form.expertOnly"
import CategoryDropdown from "./Categories.dropdown"
import use_Post_form_base from "./Post.form.base"
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined"
import SaveIcon from "@mui/icons-material/Save"
import CloseIcon from "@mui/icons-material/Close"
import { Header_root, Header_moreOptions } from "./Header"
import { useRouter } from "next/router"
import React from "react"

type Props = {
  sx?: SxProps
}

export default function Post_create_section({ sx }: Props) {
  const form_base = use_Post_form_base({})

  const form_expert = use_Post_form_expertOnly({})
  const form_expert_isActive = form_base.control.values.categories?.includes("personEndorsement")

  function onSubmit() {}

  const goBack = useRouter().back

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", ...sx }}>
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
        <Header_moreOptions options={["profile", "post.list", "devContact"]} />
      </Header_root>
      <Paper sx={{ px: 3, display: "flex", flexDirection: "column", gap: 2, m: 1, p: 2 }}>
        <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h3">Novi oglas</Typography>
          <IconButton onClick={goBack}>
            <CloseIcon fontSize="medium" />
          </IconButton>
        </Box>
        <TextField {...form_base.components_props.label} />
        {/* <CategoryDropdown {...form_base.components_props.category} /> */}
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
    </Box>
  )
}
