import { Box, Typography, useTheme, IconButton, Menu, MenuItem } from "@mui/material"
import React, { useState } from "react"
import { styled } from "@mui/material/styles"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import PostAddIcon from "@mui/icons-material/PostAdd"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined"
import EngineeringIcon from "@mui/icons-material/Engineering"

export const Header_root: typeof Box = styled(Box)(({ theme }) => ({
  background: theme.palette.primary.main,
  padding: `${theme.spacing(2)} ${theme.spacing(0)}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}))

type Header_moreOptions_props = {
  options: ("post.create" | "post.list" | "profile" | "devContact")[]
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
        {options.includes("post.list") && (
          <a href="/" style={{ textDecoration: "none" }}>
            <MenuItem>
              <ListAltOutlinedIcon
                sx={{ fontSize: typography.h3, mr: 1.5, color: palette.primary.main }}
              />
              <Typography sx={{ color: palette.primary.main }}>Objave</Typography>
            </MenuItem>
          </a>
        )}
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
        {options.includes("devContact") && (
          <a href="/kontaktiraj-razvojni-tim" style={{ textDecoration: "none" }}>
            <MenuItem>
              <EngineeringIcon
                sx={{ fontSize: typography.h3, mr: 1.5, color: palette.primary.main }}
              />
              <Typography sx={{ color: palette.primary.main, width: 120, whiteSpace: "pre-wrap" }}>
                Kontaktiraj razvojni tim
              </Typography>
            </MenuItem>
          </a>
        )}
      </Menu>
    </>
  )
}
