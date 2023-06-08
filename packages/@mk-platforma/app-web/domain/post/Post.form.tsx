import { Box, Typography, IconButton, Button, SxProps, Paper } from "@mui/material"
import Post_form_fields from "./Post.form.fields"
import SaveIcon from "@mui/icons-material/Save"
import CloseIcon from "@mui/icons-material/Close"
import { Warning_noUsername, use_noUsername_isDisplayed } from "../common"
import { z } from "zod"
import { useFormik } from "formik"
import { Post_api_cu_input } from "./Post.api.cu.input"

type Values = z.infer<typeof Post_api_cu_input>

type Props<TValues extends Values> = {
  sx?: SxProps
  onSubmit(values: TValues): void
  onCancel(): void
  title: string
  form: ReturnType<typeof useFormik<TValues>>
}

export default function Post_form<TValues extends Values>({
  sx,
  onSubmit,
  onCancel,
  title,
  form,
}: Props<TValues>) {
  const noUsername_isDisplayed = use_noUsername_isDisplayed()
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
