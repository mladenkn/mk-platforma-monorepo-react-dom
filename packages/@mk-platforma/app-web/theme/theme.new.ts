import { blue } from "@mui/material/colors"

const colors = {
  main: {
    500: blue[700],
  },
}

const bodyColor = "#E4E6EB"

const font = {
  primary: {
    color: "white",
  },
  secondary: {
    color: "rgba(0, 0, 0, 0.6)",
  },
  blackBold: {
    fontWeight: 500,
  },
}

const theme_default_elements = {
  body: {
    background: bodyColor,
  },
  header: {
    root: {
      ...font.primary,
      background: colors.main[500],
    },
    moreMenu: {
      color: colors.main[500],
    },
    moreMenu_bottomSheet: {
      background: bodyColor,
    },
  },
  post_list_page: {
    list: {
      item: {
        root: {
          background: "white",
        },
        title: {
          ...font.blackBold,
        },
        location: {
          ...font.secondary,
        },
      },
    },
    browseButton: {
      background: colors.main[500],
      ...font.primary,
    },
    browseMenu: {
      background: colors.main[500],
      ...font.primary,
    },
  },
  post_details: {
    title: {
      ...font.blackBold,
    },
    location: {
      ...font.secondary,
    },
    description: {},
  },
  logoLink: {
    ...font.primary,
  },
  comment_list: {
    item: {
      userName: {
        ...font.blackBold,
      },
      content: {},
    },
  },
}

export default theme_default_elements
