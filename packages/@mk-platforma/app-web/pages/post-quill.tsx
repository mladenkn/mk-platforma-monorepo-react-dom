import { Box, Paper } from "@mui/material"
import React, { useState } from "react"
import { Header, Header_back, Header_moreOptions } from "~/domain/Header"
import Layout from "~/domain/Layout"
import { LogoLink } from "~/domain/common"

export default function PostQuill() {
  return (
    <Layout
      header={
        <Header>
          <Header_back />
          <LogoLink />
          <Header_moreOptions />
        </Header>
      }
      content={
        <Box sx={{ p: 1, width: "100%" }}>
          <Paper sx={{ p: 2 }}>radin post quill</Paper>
        </Box>
      }
    />
  )
}
