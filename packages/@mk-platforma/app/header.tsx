import { Box, SxProps } from "@mui/material"
import { ReactNode } from "react"


type Props = {
  sx?: SxProps
  right?: ReactNode
}

export default function Header({ sx, right, }: Props){
  return (
    <Box sx={{
      background: '#2d5be3',
      width: '100%',
      pt: 1.5,
      pb: 2,
      px: 2,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      ...sx,
    }}>
      <Box sx={{ ml: 1, }}>
	      <a style={{ color: 'white', fontSize: 25, textDecoration: 'none', }} href="https://za-brata.com/">ZaBrata</a>
        <Box sx={{ color: 'white' }}>Loza kontribucionizma</Box>
	    </Box>
      {right}
    </Box>
  )
}