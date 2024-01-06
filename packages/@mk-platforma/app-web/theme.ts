import { useTheme as useThemeMaterial } from "@mui/material"

const themeExample = {
  header: {
    // background
    // text color
    moreMenu: {
      // background
      // text color
    },
    moreMenu_bottomSheet: {
      // background
      // text color
    },
  },
  postListPage: {
    body: {
      // background
    },
    postList: {
      item: {
        // background
        // title
        // location
      },
    },
    browseButton: {
      // background
      // text color
    },
    browseMenu: {
      // background
      // text color
    },
  },
  postPage: {
    title: {
      // text color
    },
    location: {
      // text color
    },
    content: {
      // background
      // text color
    },
    commentList: {
      item: {
        // background
        // user name
        content: {
          // text color
        },
      },
    },
  },
}

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
    moreMenu_bottomSheet: {},
  },
  postListPage: {
    postList: {
      item: {
        root: {
          background: "white",
        },
        title: {
          // TODO: bold
        },
        location: {
          color: "_TODO_",
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
  postPage: {
    title: {
      // TODO: bold
    },
    location: {
      color: "_TODO_",
    },
    content: {},
    commentList: {
      item: {
        userName: {
          // TODO: bold
        },
        content: {},
      },
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
    paletteGeneric: {
      warning: muiTheme.palette.warning,
      error: muiTheme.palette.error,
    },
  }
}

export type Theme = ReturnType<typeof useTheme>
