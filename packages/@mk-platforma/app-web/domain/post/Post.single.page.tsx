import Post_single_details, { Post_single_details_PostModel } from "./Post.single.details"
import { Box, IconButton, Typography } from "@mui/material"
import Api from "~/api_/api.client"
import EditIcon from "@mui/icons-material/Edit"
import { useState } from "react"
import { asNonNil, nullsToUndefinedDeep } from "@mk-libs/common/common"
import React from "react"
import Post_form from "./Post.form"
import { Header, Header_back, Header_moreOptions } from "~/domain/Header"
import Layout from "~/domain/Layout"
import { LogoLink } from "../common"
import Link from "next/link"

export default function Post_single_page({
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
          {postQuery.isLoading ? <Typography>Učitavanje...</Typography> : <></>}
          <Post_single_details
            sx={{ p: 1, width: "100%" }}
            {...post}
            usePaperSections
            editAction={
              post.canEdit ? (
                <Link
                  href={`/post/edit/${post.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <EditIcon />
                </Link>
              ) : undefined
            }
          />
        </>
      }
    />
  )
}
