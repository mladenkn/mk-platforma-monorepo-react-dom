import React, { useState } from "react"
import { Box, SxProps, IconButton, Typography, Avatar, Input } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { Api_outputs } from "~/api_/api.infer"
import Api from "~/api_/api.client"
import { match } from "ts-pattern"

type Comment = Api_outputs["comment"]["many"][number]

type Props = {
  sx?: SxProps
  comment: Comment
}

export function Comment_listItem({ sx, comment }: Props) {
  const comment_update = Api.comment.update.useMutation()
  const [isEdit, setIsEdit] = useState(false)

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
          <Avatar sx={comment.author.avatarStyle as object} children={comment.author.name?.[0]} />
          <Typography fontWeight={500} variant="h6">
            {comment.author.name}
          </Typography>
        </Box>
        <Box>
          {comment.canDelete && (
            <IconButton>
              <DeleteIcon />
            </IconButton>
          )}
          {comment.canEdit && (
            <IconButton onClick={() => setIsEdit(true)}>
              <EditIcon />
            </IconButton>
          )}
        </Box>
      </Box>
      {match(isEdit)
        .with(true, () => <Input />)
        .with(false, () => <Box sx={{ mt: 0.5, ml: 0.5 }}>{comment.content}</Box>)
        .exhaustive()}
    </Box>
  )
}
