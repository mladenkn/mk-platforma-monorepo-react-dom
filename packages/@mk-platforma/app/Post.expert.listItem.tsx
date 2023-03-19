import { Box, Typography } from "@mui/material"
import Avatar from "./avatar"
import { CSSProperties } from "react"
import LocationIcon from "@mui/icons-material/LocationOn"
import HandymanIcon from "@mui/icons-material/Handyman"


type Post_expert_listItem_Props = {
  avatarStyle: CSSProperties
  firstName: string
  lastName: string
  location: string
  occupations: string[]
}

export function Post_expert_listItem({
  avatarStyle,
  firstName,
  lastName,
  location,
  occupations,
}: Post_expert_listItem_Props){
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Avatar
        sx={{
          marginRight: 4,
          ...avatarStyle,
        }}
        letter={firstName[0]}
      />
      <Typography sx={{ fontWeight: 600, fontSize: 16, width: 115 }}>
        {firstName} {lastName}
      </Typography>
      <Box
        sx={{
          pl: 1,
          ml: 10,
          color: 'text.secondary',
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 0.3 }}>
          <LocationIcon style={{ width: 17, height: 17 }} sx={{ mr: 1 }} />
          <Typography>{location}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <HandymanIcon style={{ width: 17, height: 17 }} sx={{ mr: 1 }} />
          <Typography>{occupations.join(", ")}</Typography>
        </Box>
      </Box>
    </Box>
  )
}

type Post_expert_listItem_details_Props = {
  firstName: string
  lastName: string
  description: string
  phoneNumber: string
}

export function Post_expert_listItem_details({
  firstName,
  lastName,
  description,
  phoneNumber,
}: Post_expert_listItem_details_Props){
  return (
    <Box sx={{ p: 4 }}>
      <Typography sx={{ fontWeight: 600, fontSize: 19, mb: 3.5, }}>
        {firstName} {lastName}
      </Typography>
      <Typography>{description}</Typography>
      <Typography sx={{ mt: 4 }}>Mobitel/telefon: {phoneNumber}</Typography>
    </Box>
  )
}
