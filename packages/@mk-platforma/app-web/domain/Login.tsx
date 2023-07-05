import { Button, Container, Box, Typography, TextField, Paper, useTheme } from "@mui/material"

type Props = {
  csrfToken?: string
}

export default function Login({ csrfToken }: Props) {
  const theme = useTheme()
  return (
    <Container maxWidth="md">
      <Box sx={{ background: theme.palette.primary.main, px: 2, py: 1 }}>
        <Typography sx={{ color: "white" }} variant="h2" fontWeight={400}>
          ZaBrata
        </Typography>
        <Box sx={{ color: "white" }}>
          <Typography variant="h4" fontWeight={400}>
            Loza kontribucionizma
          </Typography>
        </Box>
      </Box>
      <Paper sx={{ py: 4, px: 2 }}>
        <form method="post" action="/api/auth/signin/email">
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <TextField
              sx={{ mb: 4, maxWidth: 500 }}
              label="Email"
              type="email"
              id="email"
              name="email"
            />
            <Button type="submit">Prijavi se</Button>
          </Box>
        </form>
      </Paper>
    </Container>
  )
}
