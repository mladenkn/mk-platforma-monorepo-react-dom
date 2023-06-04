import { Box, Typography, IconButton, Button, SxProps, Paper } from "@mui/material"
import { ComponentProps } from "react"
import Post_form_fields from "./Post.form.fields"
import SaveIcon from "@mui/icons-material/Save"
import CloseIcon from "@mui/icons-material/Close"
import { useSession } from "next-auth/react"
import { Warning_noUsername } from "../common"

type Props = {
  sx?: SxProps
  initialValues?: ComponentProps<typeof Post_form_fields>["initialValues"]
  onSubmit(): void
  onCancel(): void
  title: string
}

export default function Post_form({ sx, initialValues, onSubmit, onCancel, title }: Props) {
  const { data: session } = useSession()
  return (
    <Paper sx={{ display: "flex", flexDirection: "column", ...sx }}>
      <Box sx={{ mb: 0.75, display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h2">{title}</Typography>
        <IconButton onClick={onCancel}>
          <CloseIcon fontSize="medium" />
        </IconButton>
      </Box>
      {!session?.user?.name && <Warning_noUsername sx={{ mb: 5 }} withSetAction />}
      <Post_form_fields
        sx={{ gap: 3.5, display: "flex", flexDirection: "column" }}
        initialValues={initialValues}
      />
      <Button
        variant="contained"
        sx={{ mt: 6, display: "flex", alignItems: "center", gap: 1 }}
        onClick={onSubmit}
      >
        <SaveIcon />
        Spremi
      </Button>
    </Paper>
  )
}
