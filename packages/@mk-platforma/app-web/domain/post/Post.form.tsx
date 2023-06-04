import { Box, Typography, IconButton, Button, SxProps, Paper } from "@mui/material"
import Post_form_fields, { Post_form_fields_useForm } from "./Post.form.fields"
import SaveIcon from "@mui/icons-material/Save"
import CloseIcon from "@mui/icons-material/Close"
import { useSession } from "next-auth/react"
import { Warning_noUsername } from "../common"

type Values = ReturnType<typeof Post_form_fields_useForm>["initialValues"]

type Props = {
  sx?: SxProps
  initialValues?: Values
  onSubmit(values: Values): void
  onCancel(): void
  title: string
}

export default function Post_form({ sx, initialValues, onSubmit, onCancel, title }: Props) {
  const { data: session } = useSession()
  const form = Post_form_fields_useForm(initialValues)
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
        eachField={{
          disabled: !session?.user?.name,
        }}
        form={form}
      />
      <Button
        variant="contained"
        sx={{ mt: 6, display: "flex", alignItems: "center", gap: 1 }}
        onClick={() => onSubmit(form.values)}
        disabled={!!!session?.user?.name}
      >
        <SaveIcon />
        Spremi
      </Button>
    </Paper>
  )
}
