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
import { difference } from "lodash"

type Option =
  | "post.create"
  | "post.list"
  | "profile"
  | "other.contact"
  | "other.privacyPolicy"
  | "other.termsAndConditions"
const Option_all: Option[] = [
  "post.create",
  "post.list",
  "profile",
  "other.contact",
  "other.privacyPolicy",
  "other.termsAndConditions",
]

type Header_moreOptions_props = {
  sx?: SxProps
  exclude?: Option[]
}

export function Header_moreOptions({ sx, exclude }: Header_moreOptions_props) {
  const { typography, palette } = useTheme()
  const [optionsAnchorEl, set_optionsAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [moreOptionsActive, set_moreOptionsActive] = useState(false)

  const options = exclude?.length ? difference(Option_all, exclude) : Option_all
  const hasOther = options.some(o => o.startsWith("other."))

  const theme = {
    font: {
      color: palette.primary.main,
    },
    other: {
      background: "#E4E6EB",
      font: {
        color: palette.primary.dark,
      },
    },
  }

  function handle_includeOther() {
    set_moreOptionsActive(true)
    set_optionsAnchorEl(null)
  }

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
                sx={{ fontSize: typography.h3, mr: 1.5, color: theme.font.color }}
              />
              <Typography sx={{ color: theme.font.color }}>Objave</Typography>
            </MenuItem>
          </Link>
        )}
        {options.includes("post.create") && (
          <Link href="/post/create" style={{ textDecoration: "none" }}>
            <MenuItem>
              <PostAddIcon sx={{ fontSize: typography.h3, mr: 1.5, color: theme.font.color }} />
              <Typography sx={{ color: theme.font.color }}>Objavi</Typography>
            </MenuItem>
          </Link>
        )}
        {options.includes("profile") && (
          <MenuItem>
            <AccountCircleIcon sx={{ fontSize: typography.h3, mr: 1.5, color: theme.font.color }} />
            <Typography sx={{ color: theme.font.color }}>Moj profil</Typography>
          </MenuItem>
        )}
        {hasOther && (
          <MenuItem onClick={handle_includeOther}>
            <ExpandMoreOutlinedIcon
              sx={{ fontSize: typography.h3, mr: 1.5, color: theme.font.color }}
            />
            <Typography sx={{ color: theme.font.color, width: 120, whiteSpace: "pre-wrap" }}>
              Ostalo
            </Typography>
          </MenuItem>
        )}
      </Menu>
      {moreOptionsActive && (
        <BottomSheet
          sx={{ px: 2, pt: 1.7, pb: 2.5, background: theme.other.background }}
          onClose={() => set_moreOptionsActive(false)}
        >
          <Typography sx={{ color: theme.other.font.color }} variant="h3">
            Ostali linkovi
          </Typography>
          <Box sx={{ ml: 1.5, mt: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Link
              href="/kontakt"
              style={{ display: "flex", alignItems: "center", textDecoration: "none" }}
            >
              <ContactPageOutlinedIcon sx={{ mr: 1.5, color: theme.other.font.color }} />
              <Typography sx={{ color: theme.other.font.color }} variant="h5">
                Kontakt
              </Typography>
            </Link>
            <Link
              href="/uvjeti-pravila"
              style={{ display: "flex", alignItems: "center", textDecoration: "none" }}
            >
              <ListAltOutlinedIcon sx={{ mr: 1.5, color: theme.other.font.color }} />
              <Typography sx={{ color: theme.other.font.color }} variant="h5">
                Pravila i uvjeti korištenja
              </Typography>
            </Link>
            <Link
              href="/politika-privatnosti"
              style={{ display: "flex", alignItems: "center", textDecoration: "none" }}
            >
              <PolicyOutlinedIcon sx={{ mr: 1.5, color: theme.other.font.color }} />
              <Typography sx={{ color: theme.other.font.color }} variant="h5">
                Politika privatnosti
              </Typography>
            </Link>
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
      <Header_moreOptions {...moreOptions_props} />
    </Box>
  )
}
