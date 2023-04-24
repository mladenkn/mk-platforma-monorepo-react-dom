import { Box, IconButton, SxProps, Container, Typography } from "@mui/material"
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined"
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
      <Header_root sx={{ pl: 0.5, pr: 0.7 }}>
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pl: 1,
            pr: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "white",
              gap: 1,
              justifyContent: "start",
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
        </Container>
      </Header_root>
      <Container sx={{ px: 0 }} maxWidth="lg">
        <Post_form
          sx={{ gap: 2, p: 2, m: 1 }}
          title="Novi oglas"
          onSubmit={onSubmit}
          onCancel={goBack}
        />
      </Container>
    </Box>
  )
}
