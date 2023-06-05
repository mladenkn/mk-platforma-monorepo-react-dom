import { useRouter } from "next/router"
import React from "react"
import Post_form from "./Post.form"
import { useTheme } from "@mui/material"
import { Header, Header_moreOptions, Header_back } from "../Header"
import Layout from "../Layout"
import { LogoLink } from "../common"
import { Api_outputs } from "~/api_/api.infer"
import Api from "~/api_/api.client"

type Post_details = NonNullable<Api_outputs["post"]["single"]>

type Props = {
  post_initial: Post_details
}

export default function Post_create_page({ post_initial }: Props) {
  const router = useRouter()
  const mutation = Api.post.upsert.useMutation({
    onSuccess(post) {
      router.push(`/post/${post.id}`)
    },
  })

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
          title="Uredi oglas"
          onSubmit={v => mutation.mutate(v)}
          onCancel={useRouter().back}
        />
      }
    />
  )
}
