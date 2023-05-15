import { Box, Typography, useTheme, IconButton, Menu, MenuItem } from "@mui/material"
import React, { ComponentProps, useState } from "react"
import { SxProps } from "@mui/material/styles"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import PostAddIcon from "@mui/icons-material/PostAdd"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined"
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined"
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined"
import { useRouter } from "next/router"
import Link from "next/link"
import { LogoLink } from "./common"
import { BottomSheet } from "./BottomSheet"
import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined"
import PolicyOutlinedIcon from "@mui/icons-material/PolicyOutlined"

type Header_moreOptions_props = {
  sx?: SxProps
  options: ("post.create" | "post.list" | "profile" | "devContact")[]
}

export function Header_moreOptions({ options, sx }: Header_moreOptions_props) {
  const { typography, palette } = useTheme()
  const [optionsAnchorEl, set_optionsAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [moreOptionsActive, set_moreOptionsActive] = useState(false)
  return (
    <>
      <IconButton sx={sx} onClick={e => set_optionsAnchorEl(e.target as any)}>
        <MoreVertIcon sx={{ color: "white", fontSize: typography.h3 }} />
      </IconButton>
      <Menu
        open={!!optionsAnchorEl}
        anchorEl={optionsAnchorEl}
        onClose={() => set_optionsAnchorEl(null)}
      >
        {options.includes("post.list") && (
          <Link href="/" style={{ textDecoration: "none" }}>
            <MenuItem>
              <ListAltOutlinedIcon
                sx={{ fontSize: typography.h3, mr: 1.5, color: palette.primary.main }}
              />
              <Typography sx={{ color: palette.primary.main }}>Objave</Typography>
            </MenuItem>
          </Link>
        )}
        {options.includes("post.create") && (
          <Link href="/post/create" style={{ textDecoration: "none" }}>
            <MenuItem>
              <PostAddIcon sx={{ fontSize: typography.h3, mr: 1.5, color: palette.primary.main }} />
              <Typography sx={{ color: palette.primary.main }}>Objavi</Typography>
            </MenuItem>
          </Link>
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
          <MenuItem onClick={() => set_moreOptionsActive(true)}>
            <ExpandMoreOutlinedIcon
              sx={{ fontSize: typography.h3, mr: 1.5, color: palette.primary.main }}
            />
            <Typography sx={{ color: palette.primary.main, width: 120, whiteSpace: "pre-wrap" }}>
              Ostalo
            </Typography>
          </MenuItem>
        )}
      </Menu>
      {moreOptionsActive && (
        <BottomSheet sx={{ px: 2, pt: 1.5, pb: 1.5 }} onClose={() => set_moreOptionsActive(false)}>
          <Typography variant="h4">Ostali linkovi</Typography>
          <Box sx={{ ml: 2, mt: 1.5, display: "flex", flexDirection: "column", gap: 1.2 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ContactPageOutlinedIcon sx={{ mr: 1.5 }} />
              <Typography variant="h5">Kontakt</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ListAltOutlinedIcon sx={{ mr: 1.5 }} />
              <Typography variant="h5">Pravila i uvjeti korištenja</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <PolicyOutlinedIcon sx={{ mr: 1.5 }} />
              <Typography variant="h5">Politika privatnosti</Typography>
            </Box>
          </Box>
        </BottomSheet>
      )}
    </>
  )
}

type Header_full_common__props = {
  sx?: SxProps
  moreOptions_props?: Partial<ComponentProps<typeof Header_moreOptions>>
}

export function Header_full_common({ sx, moreOptions_props }: Header_full_common__props) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        pr: 0,
        py: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          color: "white",
          gap: 1,
          justifyContent: "start",
        }}
      >
        <IconButton sx={{ color: "white" }} onClick={useRouter().back}>
          <ArrowBackIosOutlinedIcon />
        </IconButton>
        <LogoLink />
      </Box>
      <Header_moreOptions options={["profile", "post.list", "devContact"]} {...moreOptions_props} />
    </Box>
  )
}
