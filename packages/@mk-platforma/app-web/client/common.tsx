import { styled } from "@mui/material/styles"
import { Box } from "@mui/material"

export const Backdrop: typeof Box = styled(Box)({
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  opacity: 1,
  transition: "opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  position: "fixed",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  zIndex: 4,
})
