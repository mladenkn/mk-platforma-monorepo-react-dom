import { Box, SxProps } from "@mui/material"
import Avatar from "./Avatar"
import { Comment } from "../api/data/data.types"

type Props = {
  sx?: SxProps
  comment: Comment
}

export function Comment_listItem({ sx, comment }: Props) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", ...sx }}>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 1.3 }}>
        <Avatar
          sx={comment.author.avatarStyle}
          letter={`${comment.author.firstName[0]} ${comment.author.lastName[0]}`}
        />
        <Box sx={{ fontSize: 18, fontWeight: 600 }}>
          {comment.author.firstName} {comment.author.lastName}
        </Box>
      </Box>
      <Box sx={{ mt: 1, ml: 1 }}>{comment.content}</Box>
    </Box>
  )
}
