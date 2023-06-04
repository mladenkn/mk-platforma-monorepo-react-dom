import { useRouter } from "next/router"
import React from "react"
import Post_form from "./Post.form"
import { useTheme } from "@mui/material"
import { Header, Header_moreOptions, Header_back } from "../Header"
import Layout from "../Layout"
import { LogoLink } from "../common"
import { z } from "zod"
import { Post_api_upsert_input } from "./Post.api.cu.input"
import { Api_outputs } from "~/api_/api.infer"
import Api from "~/api_/api.client"

type Post_details = NonNullable<Api_outputs["post"]["single"]>
type PostInput = z.infer<typeof Post_api_upsert_input>

type Props = {
  post_initial: Post_details
}

export default function Post_create_page({ post_initial }: Props) {
  function onSubmit(value: PostInput) {}

  const { breakpoints } = useTheme()

  return (
    <Layout
      header={
        <Header>
          <Header_back />
          <LogoLink />
          <Header_moreOptions exclude={["post.create"]} />
        </Header>
      }
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
          initialValues={post_initial}
          title="Novi oglas"
          onSubmit={onSubmit}
          onCancel={useRouter().back}
        />
      }
    />
  )
}
