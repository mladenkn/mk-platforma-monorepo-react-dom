import { SxProps, ClickAwayListener, Paper, useTheme } from "@mui/material"
import { ReactNode } from "react"

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
        className="BottomSheet"
        sx={{
          pt: 1.5,
          pr: 1.2,
          pb: 2.5,
          pl: 1.2,
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
