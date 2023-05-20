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
  contentWrapper_props?: Partial<ComponentProps<typeof Box>>
  fab?(props: WithSx): ReactNode
  backdrop?(props: WithSx): ReactNode
  onlyContentScrollable?: boolean
}

export default function Layout({
  sx,
  header = <></>,
  content = <></>,
  contentWrapper_props,
  fab = () => <></>,
  backdrop = () => <></>,
  onlyContentScrollable = false,
}: Props) {
  const { palette, breakpoints } = useTheme()
  return (
    <Container
      maxWidth="md"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        width: "100%",
        position: "relative",
        [breakpoints.down("sm")]: {
          px: 0,
        },
        [breakpoints.up("xs")]: {
          px: 0,
        },
        ...sx,
      }}
    >
      <Box
        sx={{
          background: palette.primary.main,
          pl: 2,
        }}
      >
        {header}
      </Box>
      {backdrop({})}
      <Box
        sx={{
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
      </Box>
      {fab({
        sx: {
          position: "absolute",
          bottom: 16,
          right: 16,
          [breakpoints.up("md")]: {
            right: 40,
          },
        },
      })}
    </Container>
  )
}
