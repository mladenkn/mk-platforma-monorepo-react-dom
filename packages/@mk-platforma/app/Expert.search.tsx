import { Box, Typography } from "@mui/material"
import LocationIcon from "@mui/icons-material/LocationOn"
import HandymanIcon from "@mui/icons-material/Handyman"
import data from "./data.json"
import Avatar from "./avatar"
import Section_base from "./Section.base"


const { experts } = data

export default function Expert_search() {
  return (
    <Section_base
      pageRootProps={{
        activeTab: 'experts'
      }}
      items={experts}
      renderListItem={expert => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            sx={{
              marginRight: 4,
              ...expert.avatarStyle,
            }}
            letter={expert.firstName[0]}
          />
          <Typography sx={{ fontWeight: 600, fontSize: 16, width: 115 }}>
            {expert.firstName} {expert.lastName}
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
              <Typography>{expert.location}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <HandymanIcon style={{ width: 17, height: 17 }} sx={{ mr: 1 }} />
              <Typography>{expert.occupations.join(", ")}</Typography>
            </Box>
          </Box>
        </Box>
      )}
      renderDetails={expert => (
        <Box sx={{ p: 4 }}>
          <Typography sx={{ fontWeight: 600, fontSize: 19, mb: 3.5, }}>
            {expert.firstName} {expert.lastName}
          </Typography>
          <Typography>{expert.description}</Typography>
          <Typography sx={{ mt: 4 }}>Mobitel/telefon: {expert.phoneNumber}</Typography>
        </Box>
      )}
    />
  )
}
