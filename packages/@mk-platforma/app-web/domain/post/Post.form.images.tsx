import RemoveIcon from "@mui/icons-material/Close"
import { IconButton, Box, Checkbox, Typography } from "@mui/material"
import { UploadButton } from "~/file.upload"
import "@uploadthing/react/styles.css"
import { enqueueSnackbar } from "notistack"
import Api from "~/api.trpc/api.client"
import Image from "next/image"
import useTheme from "~/theme"

type Image = {
  id: number
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

  const images_create = Api.image.create.useMutation()
  async function handle_files_uploadComplete(files?: { fileUrl: string; fileKey: string }[]) {
    if (!files) return
    const mapped = files.map(f => ({
      url: f.fileUrl,
      uploadthing_key: f.fileKey,
    }))
    const images = await images_create.mutateAsync(mapped)
    for (const image of images) {
      addItem(image)
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
                checked={image.isMain}
              />
            </Box>
            <IconButton onClick={() => removeItem(index)}>
              <RemoveIcon />
            </IconButton>
          </Box>
          <Image
            style={{ objectFit: "contain" }}
            src={image.url}
            width={250}
            height={250}
            alt="post image"
          />
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
