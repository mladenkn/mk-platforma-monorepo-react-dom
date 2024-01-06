import React, { useState } from "react"
import { Box, SxProps, IconButton, Typography, Avatar, Input, Link } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import SendIcon from "@mui/icons-material/Send"
import ClearIcon from "@mui/icons-material/Clear"
import { Api_outputs } from "~/api.trpc/api.infer"
import Api from "~/api.trpc/api.client"
import { match } from "ts-pattern"
import ConfirmModal from "./common"
import useTheme from "~/theme"

type Comment = Api_outputs["comment"]["many"][number]

type Props = {
  sx?: SxProps
  comment: Comment
  isSelected: boolean
}

export function Comment_list_item({ sx, comment, isSelected }: Props) {
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
    ctx.comment.invalidate()
  }

  const [deleteInitiated, set_deleteInitiated] = useState(false)
  async function deleteComment() {
    await comment_update.mutateAsync({
      id: comment.id,
      isDeleted: true,
    })
    ctx.comment.invalidate()
  }

  const theme = useTheme()

  return (
    <Box sx={{ display: "flex", flexDirection: "column", ...sx }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Link style={{ textDecoration: "none" }} href={`/profile/${comment.author.id}`}>
            <Avatar sx={comment.author.avatarStyle as object} children={comment.author.name?.[0]} />
          </Link>
          <Typography sx={{ ...theme.elements.comment_list.item.userName }} fontWeight={500}>
            {comment.author.name}
          </Typography>
        </Box>
        {deleteInitiated ? (
          <ConfirmModal
            message="Da li ste sigurni da želite izbrisati ovaj komentar?"
            onCancel={() => set_deleteInitiated(false)}
            onConfirm={deleteComment}
          />
        ) : undefined}
        {match({ isEdit, isSelected })
          .with({ isEdit: true, isSelected: true }, () => (
            <IconButton onClick={() => setIsEdit(false)}>
              <ClearIcon />
            </IconButton>
          ))
          .with({ isEdit: false, isSelected: true }, () => (
            <Box>
              {comment.canDelete && (
                <IconButton onClick={() => set_deleteInitiated(true)}>
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
          .otherwise(() => undefined)}
      </Box>
      {match(isEdit)
        .with(true, () => (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Input
              sx={{ flex: 1 }}
              autoFocus
              value={input}
              onChange={e => setInput(e.target.value)}
              multiline
            />
            <IconButton disabled={!input} onClick={comment_update_mutate} color="primary">
              <SendIcon />
            </IconButton>
          </Box>
        ))
        .with(false, () => (
          <Box sx={{ mt: 0.5, ml: 0.5, ...theme.elements.comment_list.item.content }}>
            {comment.content}
          </Box>
        ))
        .exhaustive()}
    </Box>
  )
}
