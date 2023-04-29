import { Box, SxProps, Container, Paper, Avatar, Typography } from "@mui/material"
import { Header_full_common } from "./Header"
import React from "react"
import Api from "./trpc.client"
import { Prisma } from "@prisma/client"
import Link from "next/link"
import { groupBy } from "lodash"
import { getCategoryLabel } from "./Categories.common"

export const User_profile_section_select = {
  select: {
    id: true,
    name: true,
    avatarStyle: true,
    posts: {
      select: {
        id: true,
        title: true,
        categories: {
          select: {
            id: true,
            label: true,
          },
        },
      },
    },
  },
} satisfies Prisma.UserArgs

type User = Prisma.UserGetPayload<typeof User_profile_section_select>

type Props = {
  sx?: SxProps
  user_initial: User
}

export default function User_profile_section({ sx, user_initial }: Props) {
  const user = Api.user.single.useQuery(user_initial.id, { initialData: user_initial })
  const posts_byCategories = Object.entries(groupBy(user.data?.posts, p => p.categories[0].id))

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", ...sx }}>
      <Header_full_common
        moreOptions_props={{
          options: ["post.create", "profile", "post.list", "devContact"],
        }}
      />
      <Container sx={{ px: 0 }} maxWidth="lg">
        <Paper sx={{ p: 2, m: 1 }}>
          {user.isLoading ? (
            "Loading..."
          ) : (
            <>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Avatar sx={{}} />
                <Typography>{user.data?.name}</Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 4 }}>
                {posts_byCategories?.map(([category_id, posts]) => (
                  <Box key={category_id}>
                    <Link
                      style={{ textDecoration: "none", color: "unset" }}
                      href={`/?category=${posts[0].categories[0].label}`}
                    >
                      <Typography>{getCategoryLabel(posts[0].categories[0].label)}</Typography>
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
            </>
          )}
        </Paper>
      </Container>
    </Box>
  )
}
