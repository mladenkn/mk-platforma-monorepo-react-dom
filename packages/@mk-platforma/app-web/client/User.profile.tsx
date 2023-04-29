import { Box, SxProps, Container, Paper, Avatar, Typography } from "@mui/material"
import { Header_full_common } from "./Header"
import React from "react"
import Api from "./trpc.client"
import { Prisma } from "@prisma/client"
import Link from "next/link"

export const User_profile_section_select = {
  select: {
    id: true,
    name: true,
    avatarStyle: true,
    posts: {
      select: {
        id: true,
        title: true,
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
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", ...sx }}>
      <Header_full_common />
      <Container sx={{ px: 0 }} maxWidth="lg">
        <Paper sx={{ p: 2 }}>
          {user.isLoading ? (
            "Loading..."
          ) : (
            <>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Avatar sx={{}} />
                <Typography>{user.data?.name}</Typography>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4, ml: 0 }}>
                {user.data?.posts.map(post => (
                  <Link
                    style={{ textDecoration: "none", color: "unset" }}
                    href={`/post/${post.id}`}
                    key={post.id}
                  >
                    <Typography>{post.title}</Typography>
                  </Link>
                ))}
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </Box>
  )
}
