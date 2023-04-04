import { Box, SxProps, Typography, useTheme } from "@mui/material"
import { ReactNode } from "react"
import { styled } from "@mui/material/styles"

type Props = {
  sx?: SxProps
  right?: ReactNode
  bottom?: ReactNode
}

export default function Header({ sx, right, bottom }: Props) {
  const { palette } = useTheme()

  return (
    <Box
      sx={{
        background: palette.primary.main,
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
          <a style={{ color: "white", textDecoration: "none" }} href="/">
            <Typography variant="h3">ZaBrata</Typography>
            <Box sx={{ color: "white" }}>
              <Typography variant="h5">Loza kontribucionizma</Typography>
            </Box>
          </a>
        </Box>
        {right}
      </Box>
      {bottom}
    </Box>
  )
}

export const Header_root: typeof Box = styled(Box)(({ theme }) => ({
  background: theme.palette.primary.main,
  padding: `${theme.spacing(2)} ${theme.spacing(1)}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}))
