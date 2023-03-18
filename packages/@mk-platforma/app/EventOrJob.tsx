import { Box, Typography } from "@mui/material"
import LocationIcon from "@mui/icons-material/LocationOn"


type EventOrJob_list_item_props = {
  label: string
  location: string
  photos: string[]
}

export function EventOrJob_list_item({ label, location, photos }: EventOrJob_list_item_props){
  return (
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <Typography sx={{ fontWeight: 600, fontSize: 16 }}>{label}</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flex: 1,
          marginTop: 3,
          marginRight: 3,
        }}
      >
        <Box sx={{ color: "text.secondary", mt: 1, ml: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 0.3 }}>
            <LocationIcon style={{ width: 17, height: 17 }} sx={{ mr: 1 }} />
            <Typography>{location}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          {photos.map((photo, index) => (
            <img key={index} width={65} height={65} src={photo} />
          ))}
        </Box>
      </Box>
    </Box>
  )
}

type EventOrJob_details_Props = {
  label: string
  location: string
  photos: string[]
  description: string
  adOwner: {
    phoneNumber: string
  }
}

export function EventOrJob_list_ItemDetails({ label, location, photos, description, adOwner }: EventOrJob_details_Props){
  return (
    <Box sx={{ p: 4 }}>
      <Typography sx={{ fontWeight: 600, fontSize: 19, mb: 3, }}>{label}</Typography>
      <Box sx={{ color: "text.secondary", mb: 6,}}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 0.3 }}>
          <LocationIcon style={{ width: 17, height: 17 }} sx={{ mr: 1 }} />
          <Typography>{location}</Typography>
        </Box>
      </Box>
      <Typography>{description}</Typography>
      <Typography sx={{ mt: 4 }}>Phone number: {adOwner.phoneNumber}</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <Box sx={{ display: "flex", gap: 2, marginTop: 4 }}>
          {photos.map((photo, index) => (
            <img key={index} width={90} height={90} src={photo} />
          ))}
        </Box>
      </Box>
    </Box>    
  )
}
