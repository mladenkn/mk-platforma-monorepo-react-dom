import { Box, IconButton, Typography, Paper } from "@mui/material"
import { useRouter } from "next/router"
import { Header_moreOptions } from "./Header"
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined"
import Layout from "./Layout"

export default function DevContact() {
  return (
    <Layout
      header={
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "min-content 1fr min-content",
            alignItems: "center",
            justifyContent: "start",
            py: 1,
            px: 1,
          }}
        >
          <IconButton sx={{ color: "white", mr: 1.5 }} onClick={useRouter().back}>
            <ArrowBackIosOutlinedIcon />
          </IconButton>
          <Typography sx={{ color: "white" }} variant="h3">
            Kontakt
          </Typography>
          <Header_moreOptions exclude={["other.contact"]} />
        </Box>
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
