import { Box, SxProps, Typography, useTheme } from "@mui/material"
import LocationIcon from "@mui/icons-material/LocationOn"
import { ReactNode } from "react"
import { Post_image } from "../api/data/data.types"

type Post_common_listItem_props = {
  label: string
  location?: string
  images?: Post_image[]
  mainImage?: string
}

export function Post_common_listItem({ label, location, images }: Post_common_listItem_props) {
  const mainImage = images?.length ? images?.find(image => image.isMain) || images[0] : null

  const imagesAtRight = images?.length === 1
  const { typography } = useTheme()

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: mainImage || imagesAtRight ? "row" : "column",
        justifyContent: imagesAtRight ? "space-between" : "unset",
      }}
    >
      {mainImage && (
        <img src={mainImage.url} width={100} height={100} style={{ marginRight: 24 }} />
      )}

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h5" fontWeight={500}>
          {label}
        </Typography>

        {location && (
          <Box sx={{ color: "text.secondary", mt: 0.75 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LocationIcon sx={{ fontSize: typography.h6, mr: 1 }} />
              <Typography variant="h6">{location}</Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}

type Post_common_listItem_details_Props = {
  sx?: SxProps
  label: string
  location?: string
  images?: Post_image[]
  description: string
  phoneNumber?: string
  label_left?: ReactNode
  label_right?: ReactNode
}

export function Post_common_details({
  sx,
  label,
  location,
  images,
  description,
  phoneNumber,
  label_left,
  label_right,
}: Post_common_listItem_details_Props) {
  const mainImage = images?.length ? images?.find(image => image.isMain) || images[0] : null

  return (
    <Box sx={sx}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 4, justifyContent: "space-between" }}>
        <Box sx={{ display: "flex" }}>
          {label_left}
          <Box>
            <Typography fontWeight={500} variant="h5">
              {label}
            </Typography>
            {location && (
              <Box sx={{ color: "text.secondary" }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 0.3 }}>
                  <LocationIcon fontSize="small" sx={{ mr: 1 }} />
                  <Typography>{location}</Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
        {label_right}
      </Box>
      {mainImage && (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4, mt: 3 }}>
          <img src={mainImage.url} />
        </Box>
      )}
      <Typography>{description}</Typography>
      {phoneNumber && <Typography sx={{ mt: 4 }}>Mobitel/telefon: {phoneNumber}</Typography>}
      {!!images?.length && (
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", marginTop: 4 }}>
            {images
              .filter(p => p)
              .map((image, index) => (
                <img key={index} width={100} height={100} src={image.url} />
              ))}
          </Box>
        </Box>
      )}
    </Box>
  )
}
