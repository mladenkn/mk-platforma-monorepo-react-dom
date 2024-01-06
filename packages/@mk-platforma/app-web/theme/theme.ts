import { useTheme as useThemeMaterial } from "@mui/material"
import theme_default_elements from "./theme.default"

export default function useTheme() {
  const muiTheme = useThemeMaterial()
  return {
    typography: muiTheme.typography,
    breakpoints: muiTheme.breakpoints,
    spacing: muiTheme.spacing,
    elements: theme_default_elements,
    palette: {
      warning: muiTheme.palette.warning,
      error: muiTheme.palette.error,
    },
  }
}

export type Theme = ReturnType<typeof useTheme>
