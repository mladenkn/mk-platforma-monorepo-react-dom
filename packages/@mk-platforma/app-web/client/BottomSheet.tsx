import { SxProps, Typography, SwipeableDrawer } from "@mui/material"
import React, { ReactNode } from "react"

type BottomSheet_Props = {
  sx?: SxProps
  children?: ReactNode
}

export function BottomSheet({ sx, children }: BottomSheet_Props) {
  return (
    <SwipeableDrawer
      // container={container}
      anchor="bottom"
      open
      onClose={() => {}}
      onOpen={() => {}}
      // swipeAreaWidth={56}
      // disableSwipeToOpen={false}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        ".MuiPaper-root": {
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          mx: "2%",
          ...sx,
        },
      }}
    >
      {children}
    </SwipeableDrawer>
  )
}
