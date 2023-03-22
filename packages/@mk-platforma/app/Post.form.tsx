import { Box, TextField, SxProps } from "@mui/material"

type Props = {
  sx?: SxProps
}

export default function PostForm({ sx }: Props) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4, ...sx }}>
      <TextField label="Naziv" variant="outlined" />
      <TextField label="Kategorije" variant="outlined" />
      <TextField label="Lokacija" variant="outlined" />
      <TextField label="Opis" variant="outlined" multiline />
      <TextField label="Broj mobitela" variant="outlined" />
    </Box>
  )
}
