import { Box, SxProps } from "@mui/material"
import Avatar from "./Avatar"
import { Comment } from "../api/data/data.types"

type Props = {
  sx?: SxProps
  comment: Comment
}

export default function Comment_listItem({ sx, comment }: Props) {
  return (
    <Box sx={sx}>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1.3 }}>
        <Avatar sx={comment.author.avatarStyle} letter={comment.author.name[0]} />
        <Box>{comment.author.name}</Box>
      </Box>
      <Box>{comment.content}</Box>
    </Box>
  )
}
