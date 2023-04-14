import { Box, Typography, IconButton, Button, SxProps, Paper } from "@mui/material"
import { ComponentProps } from "react"
import Post_form_fields from "./Post.form.fields"
import SaveIcon from "@mui/icons-material/Save"
import CloseIcon from "@mui/icons-material/Close"

type Props = {
  sx?: SxProps
  initialValues?: ComponentProps<typeof Post_form_fields>["initialValues"]
  onSubmit(): void
  onCancel(): void
  title: string
}

export default function Post_form({ sx, initialValues, onSubmit, onCancel, title }: Props) {
  return (
    <Paper sx={{ display: "flex", flexDirection: "column", ...sx }}>
      <Box sx={{ mb: 5, display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h2">{title}</Typography>
        <IconButton onClick={onCancel}>
          <CloseIcon fontSize="medium" />
        </IconButton>
      </Box>
      <Post_form_fields initialValues={initialValues} />
      <Button
        variant="contained"
        sx={{ mt: 4, display: "flex", alignItems: "center", gap: 1 }}
        onClick={onSubmit}
      >
        <SaveIcon />
        Spremi
      </Button>
    </Paper>
  )
}
