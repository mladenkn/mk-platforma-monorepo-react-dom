import { Box, SxProps } from "@mui/material"
import Avatar from "./Avatar"
import { Comment } from "../api/data/data.types"

type Props = {
  sx?: SxProps
  comments: Comment[]
}

export default function Comment_list({ sx, comments }: Props) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, ...sx }}>
      {comments.map(comment => (
        <Box>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1.3 }}>
            <Avatar sx={comment.author.avatarStyle} letter={comment.author.name[0]} />
            <Box>{comment.author.name}</Box>
          </Box>
          <Box>{comment.content}</Box>
        </Box>
      ))}
    </Box>
  )
}
