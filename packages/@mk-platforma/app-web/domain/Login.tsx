import { Button, Container, Box, TextField, Paper } from "@mui/material"
import { LogoLink } from "./common"
import { ErrorMessage, Formik } from "formik"
import { z } from "zod"
import { toFormikValidationSchema } from "zod-formik-adapter"
import Api from "~/api.trpc/api.client"
import useTheme from "~/theme/theme"

type Props = {
  csrfToken?: string
}

const initialValues = {
  email: "",
  password: "",
}

export default function Login({ csrfToken }: Props) {
  const { palette: paletteGeneric, ...theme } = useTheme()

  const auth_checkPass = Api.auth.checkPass.useMutation().mutateAsync

  const form_zod = z
    .object({
      email: z.string().min(1),
      password: z.string().min(1),
    })
    .refine(value => auth_checkPass(value.password), {
      path: ["message"],
      message: "Password invalid.",
    })

  return (
    <Container maxWidth="md">
      <Box sx={{ ...theme.elements.header.root, px: 2, py: 1 }}>
        <LogoLink />
      </Box>
      <Paper sx={{ py: 4, px: 2 }}>
        <Formik
          initialValues={initialValues}
          onSubmit={() => {}}
          validationSchema={toFormikValidationSchema(form_zod)}
          validateOnMount
        >
          {({ handleChange, isValid, handleBlur, values, errors, touched }) => (
            <form method="post" action="/api/auth/signin/email">
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                <TextField
                  sx={{ mb: 4, maxWidth: 500 }}
                  label="Email"
                  type="email"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  sx={{ maxWidth: 500, mb: 4 }}
                  label="Šifra"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
                <ErrorMessage name="password" />
                <Button disabled={!isValid} type="submit">
                  Prijavi se
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Paper>
    </Container>
  )
}
