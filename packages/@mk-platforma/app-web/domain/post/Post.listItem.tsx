import { Box, Typography, Paper } from "@mui/material"
import LocationIcon from "@mui/icons-material/LocationOn"
import React from "react"
import useTheme from "~/theme"

type Post_common_listItem_props = {
  id: number
  title: string
  location?: string
  image?: { url: string }
}

export function Post_listItem({ id, title, location, image }: Post_common_listItem_props) {
  const { typography, ...theme } = useTheme()

  return (
    <Paper
      data-testid={`Post_listItem-${id}`}
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "row",
        p: 1.5,
        cursor: "pointer",
        borderRadius: 2,
      }}
    >
      {image && (
        <img
          src={image.url}
          width={100}
          height={100}
          style={{ marginRight: 24 }}
          alt="post image"
        />
      )}

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h5" fontWeight={500}>
          {title}
        </Typography>

        {location && (
          <Box sx={{ mt: 0.75, color: theme.elements.postListPage.postList.item.location.color }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LocationIcon sx={{ fontSize: typography.h6, mr: 1 }} />
              <Typography variant="h6">{location}</Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Paper>
  )
}
