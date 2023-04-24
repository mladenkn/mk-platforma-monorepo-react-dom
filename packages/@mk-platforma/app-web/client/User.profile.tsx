import { Box, SxProps, Container, Paper } from "@mui/material"
import { Header_full_common } from "./Header"
import React from "react"

type Props = {
  sx?: SxProps
}

export default function Post_create_section({ sx }: Props) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", ...sx }}>
      <Header_full_common />
      <Container sx={{ px: 0 }} maxWidth="lg">
        <Paper>user profile</Paper>
      </Container>
    </Box>
  )
}
