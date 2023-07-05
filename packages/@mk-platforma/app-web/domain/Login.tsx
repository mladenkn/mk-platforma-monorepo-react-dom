import { Button, Input, Container, Box, Typography, TextField, Paper } from "@mui/material"

type Props = {
  csrfToken?: string
}

export default function Login({ csrfToken }: Props) {
  return (
    <Container sx={{ p: 3 }} maxWidth="xs">
      <Paper sx={{ p: 2 }}>
        <form method="post" action="/api/auth/signin/email">
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <TextField sx={{ mb: 3 }} label="Email" type="email" id="email" name="email" />
            <Button type="submit">Prijavi se</Button>
          </Box>
        </form>
      </Paper>
    </Container>
  )
}
