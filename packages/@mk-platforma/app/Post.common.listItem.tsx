import { Box, SxProps, Typography } from "@mui/material"
import LocationIcon from "@mui/icons-material/LocationOn"
import { ReactNode } from "react"

type Post_common_listItem_props = {
  label: string
  location: string
  photos?: string[] // rename to photos_bottomRight
  imageAtStart?: string
}

export function Post_common_listItem({ label, location, photos, imageAtStart }: Post_common_listItem_props) {
  const imagesAtRight = photos?.length === 1
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: imageAtStart || imagesAtRight ? "row" : "column",
        justifyContent: imagesAtRight ? "space-between" : "unset",
      }}
    >
      {imageAtStart && <img src={imageAtStart} width={100} height={100} style={{ marginRight: 24 }} />}

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography sx={{ fontWeight: 600, fontSize: 20 }}>{label}</Typography>

        <Box sx={{ color: "text.secondary", mt: 0.75 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LocationIcon sx={{ width: 19, height: 19, mr: 1 }} />
            <Typography sx={{ fontSize: 19 }}>{location}</Typography>
          </Box>
        </Box>
      </Box>

      {photos?.length && <Images images={photos} />}
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
        mt: 3,
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
  location: string
  photos?: string[]
  description: string
  phoneNumber?: string
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
  label_right,
  mainImage,
}: Post_common_listItem_details_Props) {
  return (
    <Box sx={sx}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography sx={{ fontWeight: 600, fontSize: 19 }}>{label}</Typography>
        {label_right}
      </Box>
        {mainImage && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4, mt: 3, }}>
            <img src={mainImage} />
          </Box>
        )}
      <Box sx={{ color: "text.secondary", mb: 6 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 0.3 }}>
          <LocationIcon style={{ width: 17, height: 17 }} sx={{ mr: 1 }} />
          <Typography>{location}</Typography>
        </Box>
      </Box>
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
