import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import RemoveIcon from "@mui/icons-material/Close"
import { IconButton, Box, useTheme, useMediaQuery } from "@mui/material"
import { UploadButton } from "~/file.upload"
import "@uploadthing/react/styles.css"

type Image = {
  uploadthing_key?: string | null
  url: string
}

type Props = {
  images: Image[]
  addItem(image: Image): void
  removeItem(index: number): void
}

export default function Post_form_images({ images, addItem, removeItem }: Props) {
  const { breakpoints } = useTheme()

  const Sort_icon_up = useMediaQuery(breakpoints.down("sm"))
    ? KeyboardArrowUpIcon
    : NavigateBeforeIcon
  const Sort_icon_down = useMediaQuery(breakpoints.down("sm"))
    ? KeyboardArrowDownIcon
    : NavigateNextIcon

  function handle_files_uploadComplete(files?: { fileUrl: string; fileKey: string }[]) {
    if (!files) return
    const mapped = files.map(f => ({ url: f.fileUrl, uploadthing_key: f.fileKey }))
    for (const file of mapped) {
      addItem(file)
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        [breakpoints.down("sm")]: {
          flexDirection: "column",
          gap: 1,
        },
        [breakpoints.up("sm")]: {
          flexWrap: "wrap",
          gap: 2,
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
            [breakpoints.up("sm")]: {
              flexDirection: "column",
            },
            border: 1,
          }}
        >
          <img style={{ objectFit: "contain", width: 250, height: 250 }} src={image.url} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              [breakpoints.down("sm")]: {
                flexDirection: "column",
                ml: 2,
              },
              [breakpoints.up("sm")]: {
                mt: 0.5,
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
              {/* <IconButton>
                <Sort_icon_up />
              </IconButton>
              <IconButton>
                <Sort_icon_down />
              </IconButton> */}
            </Box>
            <IconButton>
              <RemoveIcon />
            </IconButton>
          </Box>
        </Box>
      ))}
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={handle_files_uploadComplete}
        onUploadError={(error: Error) => alert(`ERROR! ${error.message}`)}
      />
    </Box>
  )
}
