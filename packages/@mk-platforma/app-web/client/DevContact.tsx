import { Box, IconButton, Typography, Paper, Container } from "@mui/material"
import { useRouter } from "next/router"
import { Header_root, Header_moreOptions } from "./Header"
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined"

export default function DevContact() {
  const goBack = useRouter().back
  return (
    <Box>
      <Header_root sx={{ pr: 1.5 }}>
        <Container sx={{ display: "flex", justifyContent: "space-between" }} maxWidth="md">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "white",
              gap: 2,
            }}
          >
            <IconButton sx={{ color: "white" }} onClick={goBack}>
              <ArrowBackIosOutlinedIcon />
            </IconButton>
            <Typography variant="h3">Kontakt</Typography>
          </Box>
          <Header_moreOptions options={["post.create", "profile", "post.list", "devContact"]} />
        </Container>
      </Header_root>
      <Container maxWidth="md" sx={{ mt: 3 }}>
        <Paper sx={{ px: 3, py: 3 }}>
          <Typography variant="h5" sx={{ mb: 4 }}>
            Razvojni programer: Mladen Knezović
          </Typography>
          <Typography variant="h5">Kontakt: mladen.knezovic.1993@gmail.com</Typography>
        </Paper>
      </Container>
    </Box>
  )
}
