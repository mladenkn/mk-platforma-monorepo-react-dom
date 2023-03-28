import { Box, SxProps } from "@mui/material"
import { ReactNode } from "react"

type Props = {
  sx?: SxProps
  right?: ReactNode
  bottom?: ReactNode
}

export default function Header({ sx, right, bottom }: Props) {
  return (
    <Box
      sx={{
        background: "#2d5be3",
        pt: 1.5,
        pb: bottom ? 0 : 3,
        ...sx,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
        }}
      >
        <Box sx={{ ml: 0.2, pl: 2 }}>
          <a style={{ color: "white", fontSize: 35, textDecoration: "none" }} href="/">
            ZaBrata
          </a>
          <Box sx={{ color: "white", fontSize: 22 }}>Loza kontribucionizma</Box>
        </Box>
        {right}
      </Box>
      {bottom}
    </Box>
  )
}
