import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import RemoveIcon from "@mui/icons-material/Close"
import { IconButton, Box, useTheme } from "@mui/material"

type Props = {
  images: {
    url: string
  }[]
}

export default function Post_form_images({ images }: Props) {
  const { breakpoints } = useTheme()

  const Sort_icon_up = breakpoints.down("sm") ? KeyboardArrowUpIcon : NavigateBeforeIcon
  const Sort_icon_down = breakpoints.down("sm") ? KeyboardArrowDownIcon : NavigateNextIcon

  return (
    <Box
      sx={{
        display: "flex",
        [breakpoints.down("sm")]: {
          flexDirection: "column",
          gap: 1,
        },
      }}
    >
      {images.map(image => (
        <Box
          key={image.url}
          sx={{
            display: "flex",
            [breakpoints.down("sm")]: {
              flexDirection: "row",
            },
          }}
        >
          <img style={{ objectFit: "contain" }} src={image.url} />
          <Box
            sx={{
              display: "flex",
              [breakpoints.down("sm")]: {
                flexDirection: "column",
                justifyContent: "space-between",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                [breakpoints.down("sm")]: {
                  flexDirection: "column",
                },
              }}
            >
              <IconButton>
                <Sort_icon_up />
              </IconButton>
              <IconButton>
                <Sort_icon_down />
              </IconButton>
            </Box>
            <IconButton>
              <RemoveIcon />
            </IconButton>
          </Box>
        </Box>
      ))}
    </Box>
  )
}
