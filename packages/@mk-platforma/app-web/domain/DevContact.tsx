import { Box, IconButton, Typography, Paper } from "@mui/material"
import { useRouter } from "next/router"
import { Header, Header_moreOptions } from "./Header"
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined"
import Layout from "./Layout"

export default function DevContact() {
  return (
    <Layout
      header={
        <Header>
          <IconButton sx={{ color: "white", mr: 1.5 }} onClick={useRouter().back}>
            <ArrowBackIosOutlinedIcon />
          </IconButton>
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
