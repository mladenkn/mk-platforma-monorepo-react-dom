import { Box, SxProps } from "@mui/material"
import { Header_full_common } from "./Header"
import { useRouter } from "next/router"
import React from "react"
import Post_form from "./Post.form"
import Layout from "./Layout"

type Props = {
  sx?: SxProps
}

export default function Post_create_page({ sx }: Props) {
  function onSubmit() {}

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", ...sx }}>
      <Layout
        header={<Header_full_common />}
        content={
          <Post_form
            sx={{ gap: 2, p: 2, mt: 1 }}
            title="Novi oglas"
            onSubmit={onSubmit}
            onCancel={useRouter().back}
          />
        }
      />
    </Box>
  )
}
