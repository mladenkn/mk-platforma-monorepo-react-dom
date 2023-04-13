import { Box, IconButton, SxProps, Button, Paper, Typography } from "@mui/material"
import Post_form_base from "./Post.form.base"
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
        <Post_form_base />
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
