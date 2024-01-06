import { SxProps, styled } from "@mui/material/styles"
import { Box, Typography, Dialog, Button } from "@mui/material"
import React from "react"
import Link from "next/link"
import { use_currentUser } from "~/utils.client"
import useTheme from "~/theme"

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
  const theme = useTheme()
  return (
    <Link style={{ textDecoration: "none", ...theme.elements.logoLink }} href="/">
      <Typography variant="h2" fontWeight={400}>
        Pametni oglasi
      </Typography>
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
  const { typography, paletteGeneric } = useTheme()
  return (
    <Typography sx={{ fontSize: typography.h6, color: paletteGeneric.warning.light, ...sx }}>
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

type ConfirmModalProps = {
  message: string
  onCancel(): void
  onConfirm(): void
}

export default function ConfirmModal(props: ConfirmModalProps) {
  return (
    <Dialog open onClose={props.onCancel}>
      <Box sx={{ px: 1.5, pt: 1, pb: 0.7 }}>
        <Typography>{props.message}</Typography>
        <Box sx={{ display: "flex", justifyContent: "end", mt: 0.5 }}>
          <Button sx={{ mr: 1, mt: 1, outline: "none" }} onClick={props.onCancel}>
            Odustani
          </Button>
          <Button sx={{ mr: 1, mt: 1, outline: "none" }} onClick={props.onConfirm}>
            Potvrdi
          </Button>
        </Box>
      </Box>
    </Dialog>
  )
}
