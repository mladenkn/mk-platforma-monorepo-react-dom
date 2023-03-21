import { Box, SxProps } from "@mui/material"
import { ReactNode } from "react"


type Props = {
  sx?: SxProps
  right?: ReactNode
}

export default function Header({ sx, right, }: Props){
  return (
    <Box
      sx={{
        background: '#2d5be3',
        width: '100%',
        pt: 1.5,
        pb: 3,
        px: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...sx,
      }}
    >
      <Box sx={{ ml: 0.2 }}>
	      <a style={{ color: 'white', fontSize: 35, textDecoration: 'none', }} href="https://za-brata.com/">ZaBrata</a>
        <Box sx={{ color: 'white', fontSize: 22, }}>Loza kontribucionizma</Box>
	    </Box>
      {right}
    </Box>
  )
}