import { Button, Container, Box, TextField, Paper, useTheme } from "@mui/material"
import { LogoLink } from "./common"

type Props = {
  csrfToken?: string
}

export default function Login({ csrfToken }: Props) {
  const theme = useTheme()
  return (
    <Container maxWidth="md">
      <Box sx={{ background: theme.palette.primary.main, px: 2, py: 1 }}>
        <LogoLink />
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
            <TextField sx={{ maxWidth: 500, mb: 4 }} label="Šifra" name="password" />
            {/* <Typography sx={{ ml: 0.5, mt: 1.5, mb: 4 }}>Hint: Šifra je "maca i miš"</Typography> */}
            <Button type="submit">Prijavi se</Button>
          </Box>
        </form>
      </Paper>
    </Container>
  )
}
