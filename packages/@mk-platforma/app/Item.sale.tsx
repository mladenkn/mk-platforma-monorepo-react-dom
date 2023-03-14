import { Box, Typography } from "@mui/material"
import LocationIcon from "@mui/icons-material/LocationOn"
import data from "./data.json"
import Section_base from "./Section.base"


const { sellableItems } = data

export default function Item_sale() {
  return (
    <Section_base
      pageRootProps={{
        activeTab: 'experts'
      }}
      items={sellableItems}
      renderListItem={item => (
        <Box sx={{ display: "flex", flex: 1 }}>
          <img src={item.imageUrl} width={100} height={100} />
          <Box sx={{ marginLeft: 3 }}>
            <Typography sx={{ fontWeight: 600, fontSize: 16 }}>{item.title}</Typography>
            <Box sx={{ color: "text.secondary", mt: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 0.3 }}>
                <LocationIcon style={{ width: 17, height: 17 }} sx={{ mr: 1 }} />
                <Typography>{item.location}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>        
      )}
      renderDetails={item => (
        <Box sx={{ p: 4 }}>
          <Typography sx={{ fontWeight: 600, fontSize: 19, mb: 3.5 }}>{item.title}</Typography>
          <Typography>{item.description}</Typography>
          <Typography sx={{ mt: 4 }}>Phone number: {item.adOwner.phoneNumber}</Typography>
        </Box>
      )}
    />
  )
}
