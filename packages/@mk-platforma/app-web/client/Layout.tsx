import { Box, SxProps } from "@mui/material"
import React, { ReactNode } from "react"

type WithSx = {
  sx?: SxProps
}

type Props = {
  sx?: SxProps
  header?(props: WithSx): ReactNode
  content?(props: WithSx): ReactNode
  bottomSheet?(props: WithSx): ReactNode | undefined | null
  fab?(props: WithSx): ReactNode
  backdrop?(props: WithSx): ReactNode
}

export default function Layout({
  sx,
  header = () => <></>,
  content = () => <></>,
  bottomSheet,
  fab = () => <></>,
  backdrop = () => <></>,
}: Props) {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        width: "100%",
        ...sx,
      }}
    >
      {header({})}
      {backdrop({})}
      {content({
        sx: {
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 0,
          height: "100%",
          overflowY: "auto",
        },
      })}
      {bottomSheet &&
        bottomSheet({
          sx: {
            flex: 1,
            zIndex: 2000,
            overflowY: "auto",
            width: "90%",
            margin: "auto",
          },
        })}
      {fab({
        sx: {
          position: "absolute",
          bottom: 16,
          right: 16,
        },
      })}
    </Box>
  )
}
