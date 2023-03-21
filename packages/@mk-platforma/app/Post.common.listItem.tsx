import { Box, Typography } from "@mui/material"
import LocationIcon from "@mui/icons-material/LocationOn"


type Post_common_listItem_props = {
  label: string
  location: string
  photos?: string[] // rename to photos_bottomRight
  imageAtStart?: string
}

export function Post_common_listItem({ label, location, photos, imageAtStart }: Post_common_listItem_props){
  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: imageAtStart ? 'row' : 'column' }}>
      {imageAtStart && <img src={imageAtStart} width={100} height={100} style={{ marginRight: 24, }} />}

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography sx={{ fontWeight: 600, fontSize: 20 }}>{label}</Typography>

        <Box sx={{ color: "text.secondary", mt: 0.75, }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LocationIcon sx={{ width: 19, height: 19, mr: 1 }} />
            <Typography sx={{ fontSize: 19 }}>{location}</Typography>
          </Box>
        </Box>
      </Box>

      {!!photos?.length && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "right",
            flex: 1,
            mt: 3,
          }}
        >        
          <Box sx={{ display: "flex", gap: 1 }}>
            {photos!.slice(0, 3).map((photo, index) => (
              <img key={index} width={65} height={65} src={photo} />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  )
}

type Post_common_listItem_details_Props = {
  label: string
  location: string
  photos?: string[]
  description: string
  phoneNumber?: string
}

export function Post_common_listItem_details({ label, location, photos, description, phoneNumber }: Post_common_listItem_details_Props){
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
      {phoneNumber && <Typography sx={{ mt: 4 }}>Mobitel/telefon: {phoneNumber}</Typography>}
      {!!photos?.length && (
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          <Box sx={{ display: "flex", gap: 2, marginTop: 4 }}>
            {photos.map((photo, index) => (
              <img key={index} width={90} height={90} src={photo} />
            ))}
          </Box>
        </Box>
      )}
    </Box>    
  )
}
