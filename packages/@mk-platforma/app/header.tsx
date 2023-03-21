import { Box, SxProps } from "@mui/material"


type Props = {
  sx?: SxProps
}

export default function Header({ sx }: Props){
  return (
    <Box sx={{ background: '#2d5be3', width: '100%', pt: 1.5, pb: 2, px: 2, ...sx, }}>
      <Box sx={{ ml: 2, }}>
	      <a style={{ color: 'white', fontSize: 25, textDecoration: 'none', }} href="https://za-brata.com/">ZaBrata</a>
        <Box sx={{ color: 'white' }}>Loza kontribucionizma</Box>
	    </Box>
    </Box>
  )
}