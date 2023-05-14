import { Box, SxProps, Container } from "@mui/material"
import { Header_full_common } from "./Header"
import { useRouter } from "next/router"
import React from "react"
import Post_form from "./Post.form"

type Props = {
  sx?: SxProps
}

export default function Post_create_page({ sx }: Props) {
  function onSubmit() {}

  const goBack = useRouter().back

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", ...sx }}>
      <Header_full_common />
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
