import { Box, Typography, IconButton, Button, SxProps, Paper } from "@mui/material"
import Post_form_fields, { Post_form_fields_useForm } from "./Post.form.fields"
import SaveIcon from "@mui/icons-material/Save"
import CloseIcon from "@mui/icons-material/Close"
import { Warning_noUsername, use_noUsername_isDisplayed } from "../common"

type Values = ReturnType<typeof Post_form_fields_useForm>["initialValues"]

type Props = {
  sx?: SxProps
  initialValues?: Values
  onSubmit(values: Values): void
  onCancel(): void
  title: string
}

export default function Post_form({ sx, initialValues, onSubmit, onCancel, title }: Props) {
  const noUsername_isDisplayed = use_noUsername_isDisplayed()
  const form = Post_form_fields_useForm(initialValues)
  console.log(20, form.isValid)
  return (
    <Paper sx={{ display: "flex", flexDirection: "column", ...sx }}>
      <Box sx={{ mb: 0.75, display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h2">{title}</Typography>
        <IconButton onClick={onCancel}>
          <CloseIcon fontSize="medium" />
        </IconButton>
      </Box>
      {noUsername_isDisplayed && <Warning_noUsername sx={{ mb: 5 }} withSetAction />}
      <Post_form_fields
        sx={{ gap: 3.5, display: "flex", flexDirection: "column" }}
        eachField={{
          disabled: noUsername_isDisplayed,
        }}
        form={form}
      />
      <Button
        variant="contained"
        sx={{ mt: 6, display: "flex", alignItems: "center", gap: 1 }}
        onClick={() => onSubmit(form.values)}
        disabled={noUsername_isDisplayed || !form.isValid}
      >
        <SaveIcon />
        Spremi
      </Button>
    </Paper>
  )
}
