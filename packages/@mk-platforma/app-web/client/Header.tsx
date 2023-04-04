import {
  Box,
  SxProps,
  Typography,
  useTheme,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material"
import { ReactNode, useState } from "react"
import { styled } from "@mui/material/styles"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import PostAddIcon from "@mui/icons-material/PostAdd"

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

export function Header_moreOptions() {
  const { typography } = useTheme()
  const [optionsAnchorEl, set_optionsAnchorEl] = useState<HTMLButtonElement | null>(null)
  return (
    <>
      <IconButton onClick={e => set_optionsAnchorEl(e.target)}>
        <MoreVertIcon sx={{ color: "white", fontSize: typography.h3 }} />
      </IconButton>
      <Popover
        open={!!optionsAnchorEl}
        anchorEl={optionsAnchorEl}
        onClose={() => set_optionsAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <List sx={{ pl: 1.5, pr: 2 }}>
          <ListItem disablePadding>
            <ListItemButton sx={{ px: 0 }}>
              <ListItemIcon>
                <PostAddIcon sx={{ fontSize: typography.h3 }} />
              </ListItemIcon>
              <ListItemText sx={{ ".MuiListItemText-primary": { fontSize: typography.h5 } }}>
                Dodaj objavu
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
    </>
  )
}
