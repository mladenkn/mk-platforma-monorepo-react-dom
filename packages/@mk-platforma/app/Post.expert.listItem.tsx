import { Box, Typography } from "@mui/material"
import Avatar from "./Avatar"
import { CSSProperties } from "react"
import LocationIcon from "@mui/icons-material/LocationOn"
import HandymanIcon from "@mui/icons-material/Handyman"


type Post_expert_listItem_Props = {
  avatarStyle: CSSProperties
  firstName: string
  lastName: string
  location: string
  skills: string[]
}

export function Post_expert_listItem({
  avatarStyle,
  firstName,
  lastName,
  location,
  skills,
}: Post_expert_listItem_Props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Avatar
        sx={{
          marginRight: 3,
          ...avatarStyle,
        }}
        letter={firstName[0]}
      />
      <Box>
        <Typography sx={{ fontWeight: 600, fontSize: 16, width: 125 }}>
          {firstName} {lastName}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", }}>
          <LocationIcon style={{ width: 17, height: 17 }} sx={{ mr: 1 }} />
          <Typography>{location}</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          pl: 1,
          color: "text.secondary",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "start" }}>
          <HandymanIcon sx={{ width: 16, height: 16, mt: 0.5, mr: 1 }} />
          <Box>
            {skills.map(s => <Typography>{s}</Typography>)}
          </Box>          
        </Box>
      </Box>
    </Box>
  )
}
