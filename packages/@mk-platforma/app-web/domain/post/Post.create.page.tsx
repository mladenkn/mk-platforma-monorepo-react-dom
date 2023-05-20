import { useRouter } from "next/router"
import React from "react"
import Post_form from "./Post.form"
import { useTheme } from "@mui/material"
import { Header_full_common } from "../Header"
import Layout from "../Layout"

type Props = {}

export default function Post_create_page({}: Props) {
  function onSubmit() {}

  const { breakpoints } = useTheme()

  return (
    <Layout
      header={<Header_full_common />}
      content={
        <Post_form
          sx={{
            gap: 2,
            p: 2,
            mx: 1,
            mt: 1,
            width: "100%",
            [breakpoints.up("md")]: { mx: 0 },
          }}
          title="Novi oglas"
          onSubmit={onSubmit}
          onCancel={useRouter().back}
        />
      }
    />
  )
}