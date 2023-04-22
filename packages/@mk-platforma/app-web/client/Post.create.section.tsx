import { Box, IconButton, SxProps, Button, Paper, Typography } from "@mui/material"
import Post_form_fields from "./Post.form.fields"
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined"
import SaveIcon from "@mui/icons-material/Save"
import CloseIcon from "@mui/icons-material/Close"
import { Header_root, Header_moreOptions } from "./Header"
import { useRouter } from "next/router"
import React from "react"
import Post_form from "./Post.form"

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
            <Typography variant="h3">Domaći oglasnik</Typography>
          </a>
        </Box>
        <Header_moreOptions options={["profile", "post.list", "devContact"]} />
      </Header_root>
      <Post_form
        sx={{ gap: 2, p: 2, m: 1 }}
        title="Novi oglas"
        onSubmit={onSubmit}
        onCancel={goBack}
      />
    </Box>
  )
}
