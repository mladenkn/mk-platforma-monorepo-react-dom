import { Box, SxProps, IconButton, Typography, Avatar } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import type { Prisma } from "@prisma/client"

type Comment = Prisma.Post_commentGetPayload<{
  select: {
    content: true
    author: {
      select: {
        avatarStyle: true
        name: true
      }
    }
  }
}> & {
  canEdit?: boolean
  canDelete?: boolean
}

type Props = {
  sx?: SxProps
  comment: Comment
}

export function Comment_listItem({ sx, comment }: Props) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", ...sx }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 1.3,
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar sx={comment.author.avatarStyle as object} children={comment.author.name[0]} />
          <Typography fontWeight={500} variant="h6">
            {comment.author.name}
          </Typography>
        </Box>
        <Box>
          {comment.canEdit && (
            <IconButton>
              <DeleteIcon />
            </IconButton>
          )}
          {comment.canDelete && (
            <IconButton>
              <EditIcon />
            </IconButton>
          )}
        </Box>
      </Box>
      <Box sx={{ mt: 0.5, ml: 0.5 }}>{comment.content}</Box>
    </Box>
  )
}
