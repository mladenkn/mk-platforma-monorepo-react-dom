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
    }
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
      }
    },
    browseButton: {
      // background
      // text color
    },
    browseMenu: {
      // background
      // text color
    }
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
        }
      }
    }
  },
}

const primary = {
  main: "#1976d2"
}

const defaultPalette = {
  header: {
    root: {
      color: "white",
      background: primary.main,
    },
    moreMenu: {
      color: primary.main
    },
    moreMenu_bottomSheet: {
    }
  },
  postListPage: {
    body: {
      background: "#E4E6EB"
    },
    postList: {
      item: {
        root: {
          background: "white"
        },
        title: {
          // TODO: bold
        },
        location: {
          color: "_TODO_"
        }
      }
    },
    browseButton: {
      background: primary.main,
      color: "white"
    },
    browseMenu: {
      background: primary.main,
      color: "white"
    }
  },
  postPage: {
    title: {
      // TODO: bold
    },
    location: {
      color: "_TODO_"
    },
    content: {
    },
    commentList: {
      item: {
        userName: {
          // TODO: bold
        },
        content: {      
        }
      }
    }
  },
}

export default function useTheme(){
  const muiTheme = useThemeMaterial()
  return {
    typography: muiTheme.typography,
    breakpoints: muiTheme.breakpoints,
    palette: defaultPalette
  }
}