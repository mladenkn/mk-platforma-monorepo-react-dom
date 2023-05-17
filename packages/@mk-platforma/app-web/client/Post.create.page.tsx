import { Header_full_common } from "./Header"
import { useRouter } from "next/router"
import React from "react"
import Post_form from "./Post.form"
import Layout from "./Layout"

type Props = {}

export default function Post_create_page({}: Props) {
  function onSubmit() {}

  return (
    <Layout
      header={<Header_full_common />}
      content={
        <Post_form
          sx={{ gap: 2, p: 2, mt: 1, width: "100%" }}
          title="Novi oglas"
          onSubmit={onSubmit}
          onCancel={useRouter().back}
        />
      }
    />
  )
}
