import { Box, Typography, useTheme } from "@mui/material"
import LocationIcon from "@mui/icons-material/LocationOn"
import React from "react"

type Post_image = {
  url: string
  isMain?: string
}

type Post_common_listItem_props = {
  id: number
  title: string
  location?: string
  images?: Post_image[]
  mainImage?: string
}

export function Post_listItem({ id, title, location, images }: Post_common_listItem_props) {
  const mainImage = images?.length ? images?.find(image => image.isMain) || images[0] : null

  const { typography } = useTheme()

  return (
    <Box
      data-testid={`Post_listItem-${id}`}
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "row",
      }}
    >
      {mainImage && (
        <img src={mainImage.url} width={100} height={100} style={{ marginRight: 24 }} />
      )}

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h5" fontWeight={500}>
          {title}
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
