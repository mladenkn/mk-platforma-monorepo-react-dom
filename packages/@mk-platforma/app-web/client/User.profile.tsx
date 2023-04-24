import { Box, SxProps, Container, Paper } from "@mui/material"
import { Header_full_common } from "./Header"
import React from "react"
import Api from "./trpc.client"
import { Prisma } from "@prisma/client"

export const User_profile_section_select = {
  select: {
    id: true,
    name: true,
    avatarStyle: true,
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
        <Paper>
          user profile
          {user.data?.name}
        </Paper>
      </Container>
    </Box>
  )
}
