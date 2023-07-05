import {
  Box,
  Typography,
  IconButton,
  CircularProgress,
  SxProps,
  Paper,
  Button,
} from "@mui/material"
import Post_form_fields from "./Post.form.fields"
import SaveIcon from "@mui/icons-material/Save"
import CloseIcon from "@mui/icons-material/Close"
import { Warning_noUsername, use_noUsername_isDisplayed } from "../common"
import { z } from "zod"
import { Post_api_cu_input } from "./Post.api.cu.input"
import { Formik } from "formik"

type Values = z.infer<typeof Post_api_cu_input>

type Props<TValues extends Values> = {
  sx?: SxProps
  onSubmit(values: TValues): Promise<unknown>
  onCancel(): void
  title: string
  initialValues: TValues
  validationSchema: any
}

export default function Post_form<TValues extends Values>({
  sx,
  onSubmit,
  onCancel,
  title,
  initialValues,
  validationSchema,
}: Props<TValues>) {
  const noUsername_isDisplayed = use_noUsername_isDisplayed()

  return (
    <Paper data-testid="Post_form" sx={{ display: "flex", flexDirection: "column", ...sx }}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnMount
      >
        {form => (
          <>
            <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h2">{title}</Typography>
              <IconButton onClick={onCancel}>
                <CloseIcon fontSize="medium" />
              </IconButton>
            </Box>
            {noUsername_isDisplayed && <Warning_noUsername sx={{ mb: 5 }} withSetAction />}
            <form onSubmit={form.handleSubmit}>
              <Post_form_fields
                sx={{ gap: 3.5, display: "flex", flexDirection: "column" }}
                eachField={{
                  disabled: noUsername_isDisplayed,
                }}
                form={form}
              />
              <Button
                variant="contained"
                sx={{ mt: 6, display: "flex", alignItems: "center", gap: 1, width: "100%" }}
                disabled={noUsername_isDisplayed || !form.isValid || form.isSubmitting}
                type="submit"
              >
                {form.isSubmitting ? <CircularProgress size="sm" /> : <SaveIcon />}
                Spremi
              </Button>
            </form>
          </>
        )}
      </Formik>
    </Paper>
  )
}
