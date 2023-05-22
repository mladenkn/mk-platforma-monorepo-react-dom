import { Box, Typography, Paper } from "@mui/material"
import { Header, Header_moreOptions, Header_home } from "./Header"
import Layout from "./Layout"

export default function DevContact() {
  return (
    <Layout
      header={
        <Header>
          <Header_home />
          <Typography sx={{ color: "white" }} variant="h3">
            Kontakt
          </Typography>
          <Header_moreOptions exclude={["other.contact"]} />
        </Header>
      }
      content={
        <Box sx={{ mt: 3 }}>
          <Paper sx={{ px: 3, py: 3 }}>
            <Typography variant="h5" sx={{ mb: 4 }}>
              Voditelj projekta: Mladen Knezović
            </Typography>
            <Typography variant="h5">Kontakt: mladen.knezovic.1993@gmail.com</Typography>
          </Paper>
        </Box>
      }
    />
  )
}
