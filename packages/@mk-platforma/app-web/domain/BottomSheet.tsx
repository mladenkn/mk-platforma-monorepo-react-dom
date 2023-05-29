import { SxProps, SwipeableDrawer } from "@mui/material"
import { ReactNode } from "react"

type BottomSheet_Props = {
  sx?: SxProps
  children?: ReactNode
  onClose(): void
}

export function BottomSheet({ sx, children, onClose }: BottomSheet_Props) {
  return (
    <SwipeableDrawer
      anchor="bottom"
      open
      onClose={onClose}
      onOpen={() => {}}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        ".MuiPaper-root": {
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          mx: "2%",
          ...sx,
        } as any,
      }}
    >
      {children}
    </SwipeableDrawer>
  )
}
