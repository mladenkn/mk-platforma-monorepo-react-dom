import { Box, Container, SxProps, useTheme } from "@mui/material"
import { omit } from "lodash"
import React, { ComponentProps, ReactNode } from "react"

type WithSx = {
  sx?: SxProps
}

type Props = {
  sx?: SxProps
  header?: ReactNode
  content?: ReactNode
  contentWrapper_props?: Partial<ComponentProps<typeof Container>>
  bottomSheet?(props: WithSx): ReactNode | undefined | null
  fab?(props: WithSx): ReactNode
  backdrop?(props: WithSx): ReactNode
  onlyContentScrollable?: boolean
}

export default function Layout({
  sx,
  header = <></>,
  content = <></>,
  contentWrapper_props,
  bottomSheet,
  fab = () => <></>,
  backdrop = () => <></>,
  onlyContentScrollable = false,
}: Props) {
  const { palette } = useTheme()
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
      <Container
        maxWidth="md"
        sx={{
          background: palette.primary.main,
        }}
      >
        {header}
      </Container>
      {backdrop({})}
      <Container
        maxWidth="md"
        sx={{
          px: 0,
          display: "flex",
          width: "100%",
          ...(onlyContentScrollable
            ? { flex: 1, minHeight: 0, height: "100%", overflowY: "auto" }
            : {}),
          ...contentWrapper_props?.sx,
        }}
        {...omit(contentWrapper_props, "sx")}
      >
        {content}
      </Container>
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
