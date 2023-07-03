import Post_details, { Post_single_details_PostModel } from "./Post.details"
import { Typography } from "@mui/material"
import Api from "~/api_/api.client"
import { asNonNil } from "@mk-libs/common/common"
import React from "react"
import { Header, Header_back, Header_moreOptions } from "~/domain/Header"
import Layout from "~/domain/Layout"
import { LogoLink } from "../common"

export default function Post_details_page({
  post_initial,
}: {
  post_initial: Post_single_details_PostModel
}) {
  const postQuery = Api.post.single.useQuery({ id: post_initial.id }, { initialData: post_initial })
  const post = asNonNil(postQuery.data)

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
        <>
          {postQuery.isLoading ? <Typography>Učitavanje...</Typography> : undefined}
          <Post_details sx={{ p: 1, width: "100%" }} {...post} usePaperSections />
        </>
      }
    />
  )
}
