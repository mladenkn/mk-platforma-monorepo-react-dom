import { Box, Typography, Avatar, useTheme } from "@mui/material"
import LocationIcon from "@mui/icons-material/LocationOn"
import HandymanIcon from "@mui/icons-material/Handyman"
import React from "react"
import { Api_outputs } from "~/api_/api.infer"

type Props = NonNullable<Api_outputs["post"]["single"]>["expertEndorsement"] & {
  location?: {
    name: string
  } | null
}

export function Post_listItem_personEndorsement({
  avatarStyle,
  firstName,
  lastName,
  location,
  skills,
}: Props) {
  const { typography } = useTheme()
  return (
    <Box sx={{ display: "flex", alignItems: "start" }}>
      <Avatar
        sx={{
          marginRight: 3,
          ...(avatarStyle as object),
        }}
        children={firstName[0] + lastName[0]}
      />
      <Box>
        <Typography variant="h6" sx={{ width: 140 }}>
          {firstName} {lastName}
        </Typography>
        {location && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LocationIcon style={{ width: 17, height: 17 }} sx={{ mr: 1 }} />
            <Typography>{location.name}</Typography>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          pl: 1,
          color: "text.secondary",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "start" }}>
          <HandymanIcon sx={{ mt: 0.5, mr: 1.5, fontSize: typography.h5 }} />
          <Box>
            {skills.map(s => (
              <Typography key={s.label}>{s.label}</Typography>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
