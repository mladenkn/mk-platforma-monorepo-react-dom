import { Box, SxProps, Typography, useTheme } from "@mui/material"
import LocationIcon from "@mui/icons-material/LocationOn"
import { CSSProperties, ReactNode } from "react"

type Post_common_listItem_props = {
  label: string
  location?: string
  photos?: string[]
  mainImage?: string
}

export function Post_common_listItem({
  label,
  location,
  photos,
  mainImage,
}: Post_common_listItem_props) {
  const imagesAtRight = photos?.length === 1
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
      {mainImage && <img src={mainImage} width={100} height={100} style={{ marginRight: 24 }} />}

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

      {photos?.length ? <Images images={photos} /> : <></>}
    </Box>
  )
}

function Images({ images }: { images: string[] }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "right",
        flex: 1,
        mt: 2,
      }}
    >
      <Box sx={{ display: "flex", gap: 1 }}>
        {images!
          .filter(p => p)
          .slice(0, 3)
          .map((image, index) => (
            <img key={index} width={75} height={75} src={image} />
          ))}
      </Box>
    </Box>
  )
}

type Post_common_listItem_details_Props = {
  sx?: SxProps
  label: string
  location?: string
  photos?: string[]
  description: string
  phoneNumber?: string
  label_left?: ReactNode
  label_right?: ReactNode
  mainImage?: string
}

export function Post_common_details({
  sx,
  label,
  location,
  photos,
  description,
  phoneNumber,
  label_left,
  label_right,
  mainImage,
}: Post_common_listItem_details_Props) {
  return (
    <Box sx={sx}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 4, justifyContent: "space-between" }}>
        <Box sx={{ display: "flex" }}>
          {label_left}
          <Box sx={{ ml: 1.5 }}>
            <Typography sx={{ fontWeight: 600, fontSize: 19 }}>{label}</Typography>
            {location && (
              <Box sx={{ color: "text.secondary" }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 0.3 }}>
                  <LocationIcon style={{ width: 17, height: 17 }} sx={{ mr: 1 }} />
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
          <img src={mainImage} />
        </Box>
      )}
      <Typography>{description}</Typography>
      {phoneNumber && <Typography sx={{ mt: 4 }}>Mobitel/telefon: {phoneNumber}</Typography>}
      {!!photos?.length && (
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", marginTop: 4 }}>
            {photos
              .filter(p => p)
              .map((photo, index) => (
                <img key={index} width={100} height={100} src={photo} />
              ))}
          </Box>
        </Box>
      )}
    </Box>
  )
}
