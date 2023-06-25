import { SxProps, styled, useTheme } from "@mui/material/styles"
import { Box, Typography } from "@mui/material"
import React from "react"
import Link from "next/link"
import { use_currentUser } from "~/utils.client"

export const Backdrop: typeof Box = styled(Box)({
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  opacity: 1,
  transition: "opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  position: "fixed",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  zIndex: 4,
})

export function LogoLink() {
  return (
    <Link style={{ color: "white", textDecoration: "none" }} href="/">
      <Typography variant="h2" fontWeight={400}>
        ZaBrata
      </Typography>
      <Box sx={{ color: "white" }}>
        <Typography variant="h4" fontWeight={400}>
          Loza kontribucionizma
        </Typography>
      </Box>
    </Link>
  )
}

export function Warning_noUsername({
  sx,
  withSetAction = false,
}: {
  sx?: SxProps
  withSetAction?: boolean
}) {
  const { typography, palette } = useTheme()
  return (
    <Typography sx={{ fontSize: typography.h6, color: palette.warning.light, ...sx }}>
      Moraš postaviti korisničko ime prije nego što počneš objavljivati sadržaj.{" "}
      {withSetAction && (
        <Link href="/profile/edit" style={{ color: "inherit" }}>
          Postavi sada.
        </Link>
      )}
    </Typography>
  )
}

export function use_noUsername_isDisplayed() {
  const { data, isLoading } = use_currentUser()
  if (isLoading) return false
  return !data?.name
}
