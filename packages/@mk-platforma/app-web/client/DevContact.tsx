import { Box, IconButton, Typography, Paper } from "@mui/material"
import { useRouter } from "next/router"
import { Header_moreOptions } from "./Header"
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined"
import Layout from "./Layout"

export default function DevContact() {
  return (
    <Layout
      header={
        <Box sx={{ display: "flex", justifyContent: "space-between", py: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "white",
              gap: 2,
            }}
          >
            <IconButton sx={{ color: "white" }} onClick={useRouter().back}>
              <ArrowBackIosOutlinedIcon />
            </IconButton>
            <Typography variant="h3">Kontakt</Typography>
          </Box>
          <Header_moreOptions options={["post.create", "profile", "post.list", "devContact"]} />
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
