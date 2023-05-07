import { Box, SxProps } from "@mui/material"
import React, { ReactNode } from "react"

type WithSx = {
  sx?: SxProps
}

type Props = {
  sx?: SxProps
  header(props: WithSx): ReactNode
  content(props: WithSx): ReactNode
  bottomSheet?(props: WithSx): ReactNode | undefined | null
  fav?(props: WithSx): ReactNode
  backdrop?(props: WithSx): ReactNode
}

export default function Layout1({
  sx,
  header = () => <></>,
  content = () => <></>,
  bottomSheet = () => <></>,
  fav = () => <></>,
  backdrop = () => <></>,
}: Props) {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        ...sx,
      }}
    >
      {header({})}
      {backdrop({})}
      {content({
        sx: {
          pr: 1,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          flex: 3,
          overflowY: "auto",
        },
      })}
      {bottomSheet({
        sx: {
          flex: 3,
          zIndex: 2000,
          overflowY: "auto",
          width: "90%",
          margin: "auto",
        },
      })}
      {fav({
        sx: {
          position: "fixed",
          bottom: 16,
          right: 16,
        },
      })}
    </Box>
  )
}
