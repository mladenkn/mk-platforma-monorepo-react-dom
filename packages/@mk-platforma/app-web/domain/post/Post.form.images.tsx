import RemoveIcon from "@mui/icons-material/Close"
import { IconButton, Box, useTheme, Checkbox, Typography } from "@mui/material"
import { UploadButton } from "~/file.upload"
import "@uploadthing/react/styles.css"
import { enqueueSnackbar } from "notistack"

type Image = {
  uploadthing_key?: string | null
  url: string
  isMain: boolean
}

type Props = {
  images: Image[]
  addItem(image: Image): void
  removeItem(index: number): void
  onChange(event: any): void
  namePrefix: string
}

export default function Post_form_images({
  images,
  addItem,
  removeItem,
  onChange,
  namePrefix,
}: Props) {
  const { breakpoints } = useTheme()

  function handle_files_uploadComplete(files?: { fileUrl: string; fileKey: string }[]) {
    if (!files) return
    const mapped = files.map(f => ({
      url: f.fileUrl,
      uploadthing_key: f.fileKey,
      isMain: false,
    }))
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
      {images.map((image, index) => (
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
            p: 0.5,
          }}
        >
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
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography>Jeli glavna slika</Typography>
              <Checkbox
                name={`${namePrefix}.${index}.isMain`}
                onChange={onChange}
                value={image.isMain}
              />
            </Box>
            <IconButton onClick={() => removeItem(index)}>
              <RemoveIcon />
            </IconButton>
          </Box>
          <img style={{ objectFit: "contain", width: 250, height: 250 }} src={image.url} />
        </Box>
      ))}
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={handle_files_uploadComplete}
        onUploadError={() =>
          enqueueSnackbar("Pogreška prilikom uploada datoteka/slika.", { variant: "error" })
        }
      />
    </Box>
  )
}
