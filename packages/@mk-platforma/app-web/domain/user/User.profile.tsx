import { Box, Paper, Avatar, Typography, IconButton, useTheme } from "@mui/material"
import React from "react"
import Link from "next/link"
import { groupBy } from "lodash"
import { Api_outputs } from "~/api.trpc/api.infer"
import { Header, Header_back, Header_moreOptions } from "../Header"
import { LogoLink, Warning_noUsername, use_noUsername_isDisplayed } from "../common"
import Layout from "~/domain/Layout"
import Api from "~/api.trpc/api.client"
import EditIcon from "@mui/icons-material/Edit"

type User = NonNullable<Api_outputs["user"]["single_withPosts"]>

type Props = {
  user_initial: User
}

export default function User_profile({ user_initial }: Props) {
  const user = Api.user.single_withPosts.useQuery(user_initial.id, { initialData: user_initial })
  const posts_byCategories = Object.entries(groupBy(user.data?.posts, p => p.categories[0].id))

  const {} = useTheme()
  const noUsername_isDisplayed = use_noUsername_isDisplayed()

  return (
    <Layout
      header={
        <Header>
          <Header_back />
          <LogoLink />
          <Header_moreOptions exclude={["profile"]} />
        </Header>
      }
      content={
        <Paper sx={{ p: 2, pb: 3, m: 1, width: "100%" }}>
          {user.isLoading ? (
            "Loading..."
          ) : (
            <>
              {noUsername_isDisplayed && <Warning_noUsername sx={{ mb: 3, mt: 1 }} withSetAction />}
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar />
                  <Typography>{user.data?.name}</Typography>
                </Box>
                {user.data?.canEdit ? (
                  <Link href="/profile/edit">
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Link>
                ) : undefined}
              </Box>
              {posts_byCategories?.length ? (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 4 }}>
                  {posts_byCategories?.map(([category_id, posts]) => (
                    <Box key={category_id}>
                      <Link
                        style={{ textDecoration: "none", color: "unset" }}
                        href={`/?category=${posts[0].categories[0].code}`}
                      >
                        <Typography>{posts[0].categories[0].label_hr}</Typography>
                      </Link>
                      <Box sx={{ ml: 2, mt: 0.5 }}>
                        {posts.map(post => (
                          <Link
                            style={{ textDecoration: "none", color: "unset" }}
                            href={`/post/${post.id}`}
                            key={post.id}
                          >
                            <Typography>{post.title}</Typography>
                          </Link>
                        ))}
                      </Box>
                    </Box>
                  ))}
                </Box>
              ) : undefined}
            </>
          )}
        </Paper>
      }
    />
  )
}
