import { Paper, Input, IconButton, Box, Avatar } from "@mui/material"
import Api from "~/api.trpc/api.client"
import { Comment_list_item } from "./Comment.list.item"
import SendIcon from "@mui/icons-material/Send"
import { useState } from "react"
import { use_currentUser } from "~/utils.client"
import { Warning_noUsername, use_noUsername_isDisplayed } from "./common"

type Props = { post_id: number; canComment: boolean }

export default function Comment_list({ post_id, canComment }: Props) {
  const comments = Api.comment.many.useQuery({ post_id })

  const comment_create = Api.comment.create.useMutation()
  const [newComment_input, set_newComment_input] = useState("")
  async function comment_create_mutate() {
    await comment_create.mutateAsync({
      post_id: post_id,
      content: newComment_input,
    })
    set_newComment_input("")
    comments.refetch()
  }

  const [selectedItem, set_selectedItem] = useState<number>()

  const user = use_currentUser()
  const avatarStyle = user.data?.avatarStyle as object | undefined

  const warning_noUsername_isDisplayed = use_noUsername_isDisplayed()

  return (
    <>
      {canComment && (
        <Paper
          sx={{
            borderRadius: 2,
            mt: 2,
            p: 1,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {warning_noUsername_isDisplayed && <Warning_noUsername withSetAction />}
          <Box sx={{ display: "flex", gap: 1 }}>
            <Avatar children={user.data?.name?.[0]} sx={{ mr: 1, ...avatarStyle }} />
            <Input
              sx={{ flex: 1 }}
              placeholder="Komentiraj"
              multiline
              value={newComment_input}
              onChange={e => set_newComment_input(e.target.value)}
            />
            <IconButton
              disabled={!newComment_input}
              onClick={comment_create_mutate}
              color="primary"
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      )}
      {comments.data?.length ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}>
          {comments.data.map(comment => (
            <Paper
              key={comment.id}
              sx={{ p: 2, pt: 1, borderRadius: 2 }}
              onClick={() => set_selectedItem(comment.id)}
              elevation={comment.id === selectedItem ? 12 : 0}
            >
              <Comment_list_item comment={comment} isSelected={comment.id === selectedItem} />
            </Paper>
          ))}
        </Box>
      ) : undefined}
    </>
  )
}
