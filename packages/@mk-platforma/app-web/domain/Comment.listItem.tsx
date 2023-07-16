import React, { useState } from "react"
import { Box, SxProps, IconButton, Typography, Avatar, Input } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import DoneIcon from "@mui/icons-material/Done"
import ClearIcon from "@mui/icons-material/Clear"
import { Api_outputs } from "~/api_/api.infer"
import Api from "~/api_/api.client"
import { match } from "ts-pattern"

type Comment = Api_outputs["comment"]["many"][number]

type Props = {
  sx?: SxProps
  comment: Comment
}

export function Comment_listItem({ sx, comment }: Props) {
  const [isEdit, setIsEdit] = useState(false)
  const [input, setInput] = useState(comment.content)

  const comment_update = Api.comment.update.useMutation()
  const ctx = Api.useContext()
  async function comment_update_mutate() {
    await comment_update.mutateAsync({
      id: comment.id,
      content: input,
    })
    setIsEdit(false)
    ctx.post.invalidate()
  }

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
        {match(isEdit)
          .with(true, () => (
            <Box>
              <IconButton sx={{ mr: 1 }} onClick={() => setIsEdit(false)}>
                <ClearIcon />
              </IconButton>
              <IconButton disabled={!input} onClick={comment_update_mutate}>
                <DoneIcon />
              </IconButton>
            </Box>
          ))
          .with(false, () => (
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
          ))
          .exhaustive()}
      </Box>
      {match(isEdit)
        .with(true, () => (
          <Input autoFocus value={input} onChange={e => setInput(e.target.value)} />
        ))
        .with(false, () => <Box sx={{ mt: 0.5, ml: 0.5 }}>{comment.content}</Box>)
        .exhaustive()}
    </Box>
  )
}
