import { Box, Paper } from "@mui/material"
import React, { useState } from "react"
import { Header, Header_back, Header_moreOptions } from "~/domain/Header"
import Layout from "~/domain/Layout"
import { LogoLink } from "~/domain/common"
import "react-quill/dist/quill.snow.css"
import dynamic from "next/dynamic"

const Quill = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})

export default function PostQuill() {
  const [editorValue, setEditorValue] = useState("")

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
          novo
          <Quill
            value={editorValue}
            onChange={value => setEditorValue(value)}
            modules={{
              toolbar: [[{ header: [1, 2, false] }], ["bold", "italic", "underline"], ["image"]],
            }}
          />
          <Quill value={editorValue} readOnly theme="bubble" />
        </Box>
      }
    />
  )
}
