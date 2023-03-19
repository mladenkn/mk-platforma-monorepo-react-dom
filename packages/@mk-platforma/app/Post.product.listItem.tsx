import { Box, Typography } from "@mui/material"
import LocationIcon from "@mui/icons-material/LocationOn"


type Post_product_listItem_Props = {
  imageUrl: string
  title: string
  location: string
}

export function Post_product_listItem({ imageUrl, title, location }: Post_product_listItem_Props){
  return (
    <Box sx={{ display: "flex", flex: 1 }}>
      <img src={imageUrl} width={100} height={100} />
      <Box sx={{ marginLeft: 3 }}>
        <Typography sx={{ fontWeight: 600, fontSize: 16 }}>{title}</Typography>
        <Box sx={{ color: "text.secondary", mt: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 0.3 }}>
            <LocationIcon style={{ width: 17, height: 17 }} sx={{ mr: 1 }} />
            <Typography>{location}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>        
  )
}


type Post_product_listItem_details = {
  title: string
  description: string
  adOwner: {
    phoneNumber: string
  }
}

export function Post_product_listItem_details({ title, description, adOwner }: Post_product_listItem_details){
  return (
    <Box sx={{ p: 4 }}>
      <Typography sx={{ fontWeight: 600, fontSize: 19, mb: 3.5 }}>{title}</Typography>
      <Typography>{description}</Typography>
      <Typography sx={{ mt: 4 }}>Mobitel/telefon: {adOwner.phoneNumber}</Typography>
    </Box>
  )
}
