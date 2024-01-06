import { useTheme as useThemeMaterial } from "@mui/material"

const mkPalette = {
  primary: {
    main: "#1976d2",
  },
}

const theme_elements_default = {
  body: {
    background: "#E4E6EB",
  },
  header: {
    root: {
      color: "white",
      background: mkPalette.primary.main,
    },
    moreMenu: {
      color: mkPalette.primary.main,
    },
    moreMenu_bottomSheet: {
      background: "#E4E6EB",
    },
  },
  post_list_page: {
    list: {
      item: {
        root: {
          background: "white",
        },
        title: {
          fontWeight: 500,
        },
        location: {
          color: "rgba(0, 0, 0, 0.6)",
        },
      },
    },
    browseButton: {
      background: mkPalette.primary.main,
      color: "white",
    },
    browseMenu: {
      background: mkPalette.primary.main,
      color: "white",
    },
  },
  post_details: {
    title: {
      fontWeight: 500,
    },
    location: {
      color: "rgba(0, 0, 0, 0.6)",
    },
    description: {},
  },
  logoLink: {
    color: "white",
  },
  comment_list: {
    item: {
      userName: {
        fontWeight: 500,
      },
      content: {},
    },
  },
}

export default function useTheme() {
  const muiTheme = useThemeMaterial()
  return {
    typography: muiTheme.typography,
    breakpoints: muiTheme.breakpoints,
    spacing: muiTheme.spacing,
    elements: theme_elements_default,
    palette: {
      warning: muiTheme.palette.warning,
      error: muiTheme.palette.error,
    },
  }
}

export type Theme = ReturnType<typeof useTheme>
