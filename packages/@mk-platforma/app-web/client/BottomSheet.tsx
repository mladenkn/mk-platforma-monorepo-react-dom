import { SxProps, ClickAwayListener, Paper, useTheme } from "@mui/material"
import React, { ReactNode } from "react"

type BottomSheet_Props = {
  sx?: SxProps
  children: ReactNode
  onClickAway?(e: any): void
}

export function BottomSheet({ sx, children, onClickAway = () => {} }: BottomSheet_Props) {
  const { spacing } = useTheme()
  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <Paper
        sx={{
          p: 2,
          borderTopRightRadius: spacing(1.5),
          borderTopLeftRadius: spacing(1.5),
          ...sx,
        }}
      >
        {children}
      </Paper>
    </ClickAwayListener>
  )
}
