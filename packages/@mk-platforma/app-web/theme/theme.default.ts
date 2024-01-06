const colors = {
  primary: {
    main: "#1976d2",
  },
}

const backgrounds = {
  body: "#E4E6EB",
}

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
    background: backgrounds.body,
  },
  header: {
    root: {
      ...font.primary,
      background: colors.primary.main,
    },
    moreMenu: {
      color: colors.primary.main,
    },
    moreMenu_bottomSheet: {
      background: backgrounds.body,
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
      background: colors.primary.main,
      ...font.primary,
    },
    browseMenu: {
      background: colors.primary.main,
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
