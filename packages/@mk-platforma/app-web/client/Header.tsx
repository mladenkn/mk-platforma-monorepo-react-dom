import {
  Box,
  SxProps,
  Typography,
  useTheme,
  IconButton,
  Popover,
  Menu,
  MenuItem,
} from "@mui/material"
import { ReactNode, useState } from "react"
import { styled } from "@mui/material/styles"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import PostAddIcon from "@mui/icons-material/PostAdd"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"

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

type Header_moreOptions_props = {
  options: ("post.create" | "profile")[]
}

export function Header_moreOptions({ options }: Header_moreOptions_props) {
  const { typography, palette } = useTheme()
  const [optionsAnchorEl, set_optionsAnchorEl] = useState<HTMLButtonElement | null>(null)
  return (
    <>
      <IconButton onClick={e => set_optionsAnchorEl(e.target as any)}>
        <MoreVertIcon sx={{ color: "white", fontSize: typography.h3 }} />
      </IconButton>
      <Menu
        open={!!optionsAnchorEl}
        anchorEl={optionsAnchorEl}
        onClose={() => set_optionsAnchorEl(null)}
      >
        {options.includes("post.create") && (
          <a href="/post/create" style={{ textDecoration: "none" }}>
            <MenuItem>
              <PostAddIcon sx={{ fontSize: typography.h3, mr: 1.5, color: palette.primary.main }} />
              <Typography sx={{ color: palette.primary.main }}>Objavi</Typography>
            </MenuItem>
          </a>
        )}
        {options.includes("profile") && (
          <MenuItem>
            <AccountCircleIcon
              sx={{ fontSize: typography.h3, mr: 1.5, color: palette.primary.main }}
            />
            <Typography sx={{ color: palette.primary.main }}>Moj profil</Typography>
          </MenuItem>
        )}
      </Menu>
    </>
  )
}
