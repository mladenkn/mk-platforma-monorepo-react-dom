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
import { BottomSheet } from "./BottomSheet"
import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined"
import PolicyOutlinedIcon from "@mui/icons-material/PolicyOutlined"
import HomeIcon from "@mui/icons-material/Home"
import { difference } from "lodash"
import { styled } from "@mui/material/styles"
import { use_currentUser } from "~/utils.client"
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew"
import { signOut } from "next-auth/react"

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
        color: palette.primary.main,
      },
    },
  }

  function handle_includeOther() {
    set_moreOptionsActive(true)
    set_optionsAnchorEl(null)
  }

  const user = use_currentUser()

  return (
    <>
      <IconButton
        data-testid="Header_moreOptions"
        sx={sx}
        onClick={e => set_optionsAnchorEl(e.target as any)}
      >
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
              <PostAddIcon
                data-testid="Header_moreOptions__PostAddIcon"
                sx={{ fontSize: typography.h3, mr: 1.5, color: theme.font.color }}
              />
              <Typography sx={{ color: theme.font.color }}>Objavi</Typography>
            </MenuItem>
          </Link>
        )}
        {user.data
          ? options.includes("profile") && (
              <Link href={`/profile/${user.data?.id}`} style={{ textDecoration: "none" }}>
                <MenuItem>
                  <AccountCircleIcon
                    sx={{ fontSize: typography.h3, mr: 1.5, color: theme.font.color }}
                  />
                  <Typography sx={{ color: theme.font.color }}>Moj profil</Typography>
                </MenuItem>
              </Link>
            )
          : undefined}
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
          <Box
            sx={{
              ml: 1.5,
              mt: 2,
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              alignItems: "start",
            }}
          >
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
            {user.data ? (
              <IconButton
                sx={{ display: "flex", alignItems: "center", textDecoration: "none", p: 0 }}
                onClick={() => signOut()}
              >
                <PowerSettingsNewIcon sx={{ mr: 1.5, color: theme.other.font.color }} />
                <Typography sx={{ color: theme.other.font.color }} variant="h5">
                  Odjavi se
                </Typography>
              </IconButton>
            ) : undefined}
          </Box>
        </BottomSheet>
      )}
    </>
  )
}

export const Header: typeof Box = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "min-content 1fr min-content",
  alignItems: "center",
  justifyContent: "start",
  padding: `${theme.spacing(2)} ${theme.spacing(1)}`,
  background: theme.palette.primary.main,
}))

export function Header_back(props: ComponentProps<typeof IconButton>) {
  return (
    <IconButton sx={{ color: "white", mr: 1.5 }} onClick={useRouter().back} {...props}>
      <ArrowBackIosOutlinedIcon />
    </IconButton>
  )
}

export function Header_home() {
  const { typography } = useTheme()
  return (
    <Link href="/" style={{ textDecoration: "none" }}>
      <IconButton sx={{ color: "white", mr: 1.5 }}>
        <HomeIcon sx={{ fontSize: typography.h3 }} />
      </IconButton>
    </Link>
  )
}
