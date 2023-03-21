import { Box, TextField } from "@mui/material";

export default function PostForm(){
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, }}>
      <TextField
        label="Naziv"
        variant="outlined"
      />
      <TextField
        label="Kategorije"
        variant="outlined"
      />
      <TextField
        label="Lokacija"
        variant="outlined"
      />
      <TextField
        label="Opis"
        variant="outlined"
        multiline
      />
      <TextField
        label="Broj mobitela"
        variant="outlined"
      />
    </Box>
  )
}
