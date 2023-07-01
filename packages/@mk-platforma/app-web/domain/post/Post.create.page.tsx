import { useRouter } from "next/router"
import React from "react"
import Post_form from "./Post.form"
import { useTheme } from "@mui/material"
import { Header, Header_moreOptions, Header_back } from "../Header"
import Layout from "../Layout"
import { LogoLink } from "../common"
import Api from "~/api_/api.client"
import { Post_api_create_input } from "./Post.api.cu.input"
import { toFormikValidationSchema } from "zod-formik-adapter"
import { signIn, useSession } from "next-auth/react"

export default function Post_create_page() {
  const session = useSession()
  if (session.status !== "loading" && !session.data?.user) signIn()

  const router = useRouter()
  const mutation = Api.post.create.useMutation({
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
          title="Novi oglas"
          onSubmit={v => mutation.mutate(v)}
          onCancel={useRouter().back}
          initialValues={{
            title: "",
            description: "",
            contact: "",
            location: undefined,
            categories: [],
          }}
          validationSchema={toFormikValidationSchema(Post_api_create_input)}
        />
      }
    />
  )
}
